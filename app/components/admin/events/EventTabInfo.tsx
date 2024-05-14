import { useState } from 'react';
import { Event } from '../../types/Event';
import {
  ErrorItem,
  getErrosFromZod,
} from '../../utils/functions/getErrorsFromZod';
import { InputField } from '../InputField';
import { Button } from '../Button';
import { z } from 'zod';
import { updateEvent } from '../../api/admin';
type Props = {
  event: Event;
  refreshAction: () => void;
};
export const EventTabInfo = ({ event, refreshAction }: Props) => {
  const [titleField, setTitleField] = useState(event.title);
  const [descriptionField, setDescriptionField] = useState(event.description);
  const [groupedField, setGroupedField] = useState(event.grouped);
  const [statusField, setStatusField] = useState(event.status);
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [loading, setLoading] = useState(false);

  const eventSchema = z.object({
    titleField: z.string().min(1, 'Preencha o título do evento'),
    descriptionField: z.string().min(1, 'Preencha a descrição do evento'),
    groupedField: z.boolean(),
    statusField: z.boolean(),
  });

  const handleSaveButton = async () => {
    setLoading(true);
    setErrors([]);
    const data = eventSchema.safeParse({
      titleField,
      descriptionField,
      groupedField,
      statusField,
    });
    if (!data.success) return setErrors(getErrosFromZod(data.error));
    setLoading(true);

    const eventItem = await updateEvent(event.id, {
      title: titleField,
      description: descriptionField,
      grouped: groupedField,
      status: statusField,
    });

    setLoading(false);
    if (eventItem) refreshAction();
    else {
      alert('Não foi possível sortear com esses grupos/pessoas');
    }
  };

  return (
    <div className="my-3 ">
      <div className="mb-5">
        <label>Título</label>
        <InputField
          value={titleField}
          onChange={(e) => setTitleField(e.target.value)}
          placeholder="Digite o título do evento"
          errorMessage={
            errors.find((error) => error.field === 'titleField')?.message
          }
          disabled={loading}
        />
      </div>
      <div className="mb-5">
        <label>Título</label>
        <InputField
          value={descriptionField}
          onChange={(e) => setDescriptionField(e.target.value)}
          placeholder="Digite a Descrição do evento"
          errorMessage={
            errors.find((error) => error.field === 'descriptionField')?.message
          }
          disabled={loading}
        />
      </div>
      <div className=" flex mb-5">
        <div className="flex-1">
          <label>Agrupar sorteio?</label>
          <input
            type="checkbox"
            checked={groupedField}
            onChange={(e) => setGroupedField(!groupedField)}
            className="block w-5 h-5 mt-3"
            disabled={loading}
          />
        </div>

        <div className="flex-1">
          <label>Evento Liberado?</label>
          <input
            type="checkbox"
            checked={statusField}
            onChange={(e) => setStatusField(!statusField)}
            className="block w-5 h-5 mt-3"
            disabled={loading}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button value="Salvar" onClick={handleSaveButton} disabled={loading} />
      </div>
    </div>
  );
};
