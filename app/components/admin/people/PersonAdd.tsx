import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { addPerson } from '@/lib/api/admin';
import { escapeCPF } from '@/lib/utils/escapeCPF';
import {
  ErrorItem,
  getErrorsFromZod,
} from '@/lib/utils/getErrorsFromZod';
import { Button } from '@/app/components/ui/Button';
import { InputField } from '@/app/components/ui/InputField';

type Props = {
  eventId: number;
  groupId: number;
  refreshAction: () => void;
};

export const PersonAdd = ({ eventId, groupId, refreshAction }: Props) => {
  const [nameField, setNameField] = useState('');
  const [cpfField, setCpfField] = useState('');
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [loading, setLoading] = useState(false);

  const personSchema = z.object({
    nameField: z.string().min(1, 'Preencha o nome da pessoa'),
    cpfField: z.string().length(11, 'CPF inválido'),
  });

  const handleSaveButton = async () => {
    setErrors([]);
    const data = personSchema.safeParse({ nameField, cpfField });
    if (!data.success) return setErrors(getErrorsFromZod(data.error));
    setLoading(true);
    const newPerson = await addPerson(eventId, groupId, {
      name: nameField,
      cpf: cpfField,
    });
    setLoading(false);
    if (newPerson) {
      setNameField('');
      setCpfField('');
      refreshAction();
      toast.success('Participante adicionado');
    } else {
      toast.error('Não foi possível adicionar o participante');
    }
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        void handleSaveButton();
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
      <div className="flex justify-end">
        <Button
          value="Adicionar participante"
          type="submit"
          loading={loading}
          disabled={loading}
          fullWidth={false}
          className="min-w-44"
        />
      </div>
    </form>
  );
};
