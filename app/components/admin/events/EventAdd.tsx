import { toast } from 'sonner';
import { addEvent } from '@/lib/api/admin';
import { EventForm, EventFormValues } from './EventForm';

type Props = {
  refreshAction: () => void;
};

export const EventAdd = ({ refreshAction }: Props) => {
  const handleSubmit = async (values: EventFormValues) => {
    const eventItem = await addEvent({
      title: values.title,
      description: values.description,
      grouped: values.grouped,
    });

    if (eventItem) {
      refreshAction();
      toast.success('Evento criado');
      return true;
    }

    toast.error('Não foi possível criar o evento');
    return false;
  };

  return (
    <EventForm mode="create" submitLabel="Criar evento" onSubmit={handleSubmit} />
  );
};
