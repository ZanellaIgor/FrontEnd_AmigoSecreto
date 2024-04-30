import { useState } from 'react';
import { InputField } from '../InputField';
import { Button } from '../Button';
import { z } from 'zod';
import {
  ErrorItem,
  getErrosFromZod,
} from '../../utils/functions/getErrorsFromZod';
import { addEvent } from '../../api/admin';

type Props = {
  refreshAction: () => void;
};
export const EventAdd = ({ refreshAction }: Props) => {
  const [titleField, setTitleField] = useState('');
  const [descriptionField, setDescriptionField] = useState('');
  const [groupedField, setGroupedField] = useState(false);
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [loading, setLoading] = useState(false);

  const eventSchema = z.object({
    titleField: z.string().min(1, 'Preencha o título'),
    descriptionField: z.string().min(1, 'Preencha a descrição'),
    groupedField: z.boolean(),
  });
  const handleAddButton = async () => {
    setErrors([]);
    const data = eventSchema.safeParse({
      titleField,
      descriptionField,
      groupedField,
    });
    if (!data.success) return setErrors(getErrosFromZod(data.error));
    setLoading(true);

    const eventItem = await addEvent({
      title: data.data.titleField,
      description: data.data.descriptionField,
      grouped: data.data.groupedField,
    });
    setLoading(false);
    if (eventItem) refreshAction();
  };
  return (
    <div>
      <div className="mb-5">
        <label>
          Título
          <InputField
            value={titleField}
            onChange={(e) => setTitleField(e.target.value)}
            placeholder="Digite o título do evento"
            disabled={loading}
            errorMessage={
              errors.find((item) => item.field === 'titleField')?.message
            }
          />
        </label>
      </div>
      <div className="mb-5">
        <label>
          Descrição
          <InputField
            value={descriptionField}
            onChange={(e) => setDescriptionField(e.target.value)}
            placeholder="Digite o título do evento"
            disabled={loading}
            errorMessage={
              errors.find((item) => item.field === 'descriptionField')?.message
            }
          />
        </label>
      </div>
      <div className="mb-5">
        <label>Agrupar sorteio?</label>
        <input
          type="checkbox"
          checked={groupedField}
          disabled={loading}
          onChange={(e) => setGroupedField(!groupedField)}
          className="block w-5 h-5 mt-3"
        />
      </div>
      <div>
        <Button value="Adicionar" onClick={handleAddButton} />
      </div>
      <button></button>
    </div>
  );
};
