import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { updatePerson } from '@/lib/api/admin';
import { PersonComplete } from '@/lib/types/PersonComplete';
import { escapeCPF } from '@/lib/utils/escapeCPF';
import {
  ErrorItem,
  getErrorsFromZod,
} from '@/lib/utils/getErrorsFromZod';
import { Button } from '@/app/components/ui/Button';
import { InputField } from '@/app/components/ui/InputField';

type Props = {
  person: PersonComplete;
  refreshAction: () => void;
  onCancel: () => void;
};

export const PersonEdit = ({ person, refreshAction, onCancel }: Props) => {
  const [nameField, setNameField] = useState(person.name);
  const [cpfField, setCpfField] = useState(person.cpf);
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [loading, setLoading] = useState(false);

  const personSchema = z.object({
    nameField: z.string().min(1, 'Preencha o nome da pessoa'),
    cpfField: z.string().length(11, 'CPF inválido'),
  });

  const handleUpdateButton = async () => {
    setErrors([]);
    const data = personSchema.safeParse({ nameField, cpfField });
    if (!data.success) return setErrors(getErrorsFromZod(data.error));
    setLoading(true);
    const editPerson = await updatePerson(
      person.id_event,
      person.id_group,
      person.id,
      {
        name: nameField,
        cpf: cpfField,
      }
    );
    setLoading(false);
    if (editPerson) {
      refreshAction();
      toast.success('Participante atualizado');
    } else {
      toast.error('Não foi possível atualizar o participante');
    }
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        void handleUpdateButton();
      }}
    >
      <InputField
        label="Nome"
        value={nameField}
        onChange={(e) => setNameField(e.target.value)}
        placeholder="Nome completo"
        errorMessage={errors?.find((e) => e.field === 'nameField')?.message}
        disabled={loading}
      />
      <InputField
        label="CPF"
        value={cpfField}
        onChange={(e) => setCpfField(escapeCPF(e.target.value))}
        placeholder="Somente números"
        errorMessage={errors?.find((e) => e.field === 'cpfField')?.message}
        disabled={loading}
      />
      <div className="flex justify-end gap-3">
        <Button
          value="Cancelar"
          type="button"
          variant="secondary"
          fullWidth={false}
          onClick={onCancel}
          disabled={loading}
        />
        <Button
          value="Salvar"
          type="submit"
          fullWidth={false}
          className="min-w-28"
          loading={loading}
          disabled={loading}
        />
      </div>
    </form>
  );
};
