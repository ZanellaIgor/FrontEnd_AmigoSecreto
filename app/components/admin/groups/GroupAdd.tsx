import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { addGroup } from '@/lib/api/admin';
import {
  ErrorItem,
  getErrorsFromZod,
} from '@/lib/utils/getErrorsFromZod';
import { Button } from '@/app/components/ui/Button';
import { InputField } from '@/app/components/ui/InputField';

type Props = {
  eventId: number;
  refreshAction: () => void;
};

export const GroupAdd = ({ eventId, refreshAction }: Props) => {
  const [nameField, setNameField] = useState('');
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [loading, setLoading] = useState(false);

  const groupSchema = z.object({
    nameField: z.string().min(1, 'Preencha o nome do grupo'),
  });

  const handleAddButton = async () => {
    setErrors([]);
    const data = groupSchema.safeParse({ nameField });
    if (!data.success) return setErrors(getErrorsFromZod(data.error));
    setLoading(true);
    const newGroup = await addGroup(eventId, { name: nameField });
    if (newGroup) {
      setNameField('');
      refreshAction();
      toast.success('Grupo adicionado');
    } else {
      toast.error('Não foi possível adicionar o grupo');
    }
    setLoading(false);
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        void handleAddButton();
      }}
    >
      <InputField
        label="Nome do grupo"
        value={nameField}
        onChange={(e) => setNameField(e.target.value)}
        placeholder="Ex.: Família, Trabalho..."
        errorMessage={
          errors.find((item) => item.field === 'nameField')?.message
        }
        disabled={loading}
      />
      <div className="flex justify-end">
        <Button
          value="Adicionar grupo"
          type="submit"
          loading={loading}
          disabled={loading}
          fullWidth={false}
          className="min-w-36"
        />
      </div>
    </form>
  );
};
