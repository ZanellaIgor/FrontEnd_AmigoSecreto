import { useState } from 'react';
import { z } from 'zod';
import { addPerson } from '../../api/admin';
import { escapeCPF } from '../../utils/functions/escapeCPF';
import {
  ErrorItem,
  getErrosFromZod,
} from '../../utils/functions/getErrorsFromZod';
import { Button } from '../Button';
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
  const [loading, setLoading] = useState(false);

  const personSchema = z.object({
    nameField: z.string().min(1, 'Preencha o nome da pessoa'),
    cpfField: z.string().length(11, 'CPF inválido'),
  });
  const handleSaveButton = async () => {
    setErrors([]);
    const data = personSchema.safeParse({ nameField, cpfField });
    if (!data.success) return setErrors(getErrosFromZod(data.error));
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
    } else {
      alert('Ocorreu um erro');
    }
  };
  return (
    <div>
      <h4 className="text-xl">Novo Participante:</h4>
      <InputField
        value={nameField}
        onChange={(e) => setNameField(e.target.value)}
        placeholder="Digite o nome da Pessoa"
        errorMessage={errors?.find((e) => e.field === 'nameField')?.message}
        disabled={loading}
      />
      <InputField
        value={cpfField}
        onChange={(e) => setCpfField(escapeCPF(e.target.value))}
        placeholder="Digite o CPF da Pessoa"
        errorMessage={errors?.find((e) => e.field === 'cpfField')?.message}
        disabled={loading}
      />
      <div>
        <Button
          onClick={handleSaveButton}
          value={`${loading ? 'Adicionando...' : 'Adicionar'}`}
          disabled={loading}
        />
      </div>
    </div>
  );
};
