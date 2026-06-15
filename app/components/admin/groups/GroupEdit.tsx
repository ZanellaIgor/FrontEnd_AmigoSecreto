import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { updateGroup } from '@/lib/api/admin';
import { Group } from '@/lib/types/Group';
import {
  ErrorItem,
  getErrorsFromZod,
} from '@/lib/utils/getErrorsFromZod';
import { Button } from '@/app/components/ui/Button';
import { InputField } from '@/app/components/ui/InputField';

type Props = {
  group: Group;
  refreshAction: () => void;
  onCancel: () => void;
};

export const GroupEdit = ({ group, refreshAction, onCancel }: Props) => {
  const [nameField, setNameField] = useState(group.name);
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [loading, setLoading] = useState(false);

  const groupSchema = z.object({
    nameField: z.string().min(1, 'Preencha o nome do grupo'),
  });

  const handleSaveButton = async () => {
    setErrors([]);
    const data = groupSchema.safeParse({ nameField });
    if (!data.success) return setErrors(getErrorsFromZod(data.error));
    setLoading(true);
    const updatedGroup = await updateGroup(group.id_event, group.id, {
      name: nameField,
    });
    if (updatedGroup) {
      refreshAction();
      toast.success('Grupo atualizado');
    } else {
      toast.error('Não foi possível atualizar o grupo');
    }
    setLoading(false);
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
        label="Nome do grupo"
        value={nameField}
        onChange={(e) => setNameField(e.target.value)}
        placeholder="Digite o nome do grupo"
        errorMessage={
          errors.find((item) => item.field === 'nameField')?.message
        }
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
