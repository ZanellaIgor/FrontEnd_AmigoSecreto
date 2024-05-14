import { useState } from 'react';
import { InputField } from '../InputField';
import { z } from 'zod';
import {
  ErrorItem,
  getErrosFromZod,
} from '../../utils/functions/getErrorsFromZod';
import { Button } from '../Button';
import { addGroup } from '../../api/admin';

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
    if (!data.success) return setErrors(getErrosFromZod(data.error));
    setLoading(true);
    const newGroup = await addGroup(eventId, { name: nameField });
    if (newGroup) {
      setNameField('');
      refreshAction();
    } else {
      alert('Ocorreu um erro');
    }
    setLoading(false);
  };
  return (
    <div>
      <h4 className="text-xl">Novo Grupo:</h4>
      <InputField
        value={nameField}
        onChange={(e) => setNameField(e.target.value)}
        placeholder="Digite o nome do Grupo"
        errorMessage={
          errors.find((item) => item.field === 'nameField')?.message
        }
        disabled={loading}
      />
      <div className="">
        <Button
          value={loading ? 'Adicionando...' : 'Adicionar'}
          onClick={handleAddButton}
        />
      </div>
    </div>
  );
};
