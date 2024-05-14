import { useState } from 'react';
import { PersonComplete } from '../../types/PersonComplete';
import {
  ErrorItem,
  getErrosFromZod,
} from '../../utils/functions/getErrorsFromZod';
import { z } from 'zod';
import { InputField } from '../InputField';
import { Button } from '../Button';
import { escapeCPF } from '../../utils/functions/escapeCPF';
import { updatePerson } from '../../api/admin';

type Props = {
  person: PersonComplete;
  refreshAction: () => void;
};
export const PersonEdit = ({ person, refreshAction }: Props) => {
  const [nameField, setNameField] = useState(person.name);
  const [cpfField, setCpfField] = useState(person.cpf);
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [loading, setLoading] = useState(false);

  const personSchema = z.object({
    nameField: z.string().min(1, 'Preencha o nome da pessoa'),
    cpfField: z.string().length(11, 'CPF inválido'),
  });
  const handleUpdateButton = async () => {
    setErrors([]);
    const data = personSchema.safeParse({ nameField, cpfField });
    if (!data.success) return setErrors(getErrosFromZod(data.error));
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
    } else {
      alert('Ocorreu um erro');
    }
  };
  return (
    <div>
      <h4 className="text-xl">Editar Participante:</h4>
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
      <div className="flex gap-3 justify-end">
        <Button value="Cancelar" disabled={loading} onClick={refreshAction} />
        <Button
          onClick={handleUpdateButton}
          value={`${loading ? 'Salvando...' : 'Salvar'}`}
          disabled={loading}
        />
      </div>
    </div>
  );
};
