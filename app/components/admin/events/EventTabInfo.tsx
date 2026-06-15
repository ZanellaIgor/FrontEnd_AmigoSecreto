import { toast } from 'sonner';
import { updateEvent } from '@/lib/api/admin';
import { Event } from '@/lib/types/Event';
import { EventForm, EventFormValues } from './EventForm';

type Props = {
  event: Event;
  refreshAction: () => void;
};

export const EventTabInfo = ({ event, refreshAction }: Props) => {
  const handleSubmit = async (values: EventFormValues) => {
    const eventItem = await updateEvent(event.id, {
      title: values.title,
      description: values.description,
      grouped: values.grouped,
      status: values.status,
    });

    if (eventItem) {
      refreshAction();
      toast.success('Evento atualizado');
      return true;
    }

    toast.error('Não foi possível salvar. Verifique grupos e participantes.');
    return false;
  };

  return (
    <EventForm
      mode="edit"
      initial={event}
      submitLabel="Salvar alterações"
      onSubmit={handleSubmit}
    />
  );
};
