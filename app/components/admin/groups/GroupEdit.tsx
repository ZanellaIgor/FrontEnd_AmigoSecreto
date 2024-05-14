import { useState } from 'react';
import { Group } from '../../types/Group';
import {
  ErrorItem,
  getErrosFromZod,
} from '../../utils/functions/getErrorsFromZod';
import { InputField } from '../InputField';
import { Button } from '../Button';
import { z } from 'zod';
import { updateGroup } from '../../api/admin';

type Props = {
  group: Group;
  refreshAction: () => void;
};
export const GroupEdit = ({ group, refreshAction }: Props) => {
  const [nameField, setNameField] = useState(group.name);
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [loading, setLoading] = useState(false);

  const groupSchema = z.object({
    nameField: z.string().min(1, 'Preencha o nome do grupo'),
  });
  const handleSaveButton = async () => {
    setErrors([]);
    const data = groupSchema.safeParse({ nameField });
    if (!data.success) return setErrors(getErrosFromZod(data.error));
    setLoading(true);
    const updatedGroup = await updateGroup(group.id_event, group.id, {
      name: nameField,
    });
    if (updatedGroup) {
      setNameField('');

      refreshAction();
    } else {
      alert('Ocorreu um erro');
    }
    setLoading(false);
  };

  return (
    <div>
      <InputField
        value={nameField}
        onChange={(e) => setNameField(e.target.value)}
        placeholder="Digite o nome do grupo"
        errorMessage={
          errors.find((item) => item.field === 'nameField')?.message
        }
      />
      <div className="flex gap-3">
        <Button
          value="Cancelar"
          onClick={() => refreshAction()}
          disabled={loading}
        />
        <Button
          value={`${loading ? 'Salvando' : 'Salvar'}`}
          onClick={handleSaveButton}
          disabled={loading}
        />
      </div>
    </div>
  );
};
