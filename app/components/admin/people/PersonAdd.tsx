import { useState } from 'react';
import { ErrorItem } from '../../utils/functions/getErrorsFromZod';
import { InputField } from '../InputField';

type Props = {
  eventId: number;
  groupId: number;
  refreshAction: () => void;
};
export const PersonAdd = ({ eventId, groupId, refreshAction }: Props) => {
  const [nameField, setNameField] = useState('');
  const [cpfField, setCpfField] = useState('');
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const handleSaveButton = async () => {};
  return (
    <div>
      <h4 className="text-xl">Novo Participante:</h4>
      <InputField
        value={nameField}
        onChange={(e) => setNameField(e.target.value)}
      />
    </div>
  );
};
