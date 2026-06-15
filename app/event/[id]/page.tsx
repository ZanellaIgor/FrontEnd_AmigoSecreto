import type { Metadata } from 'next';
import { PublicShell } from '@/app/components/layout/PublicShell';
import { Search } from '@/app/components/site/Search';
import { EventUnavailable } from '@/app/components/site/EventUnavailable';
import { getEvents } from '@/lib/api/site';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const eventId = parseInt(id, 10);

  if (Number.isNaN(eventId)) {
    return { title: 'Evento | Amigo Secreto' };
  }

  try {
    const event = await getEvents(eventId);
    if (!event?.title) return { title: 'Evento | Amigo Secreto' };
    return {
      title: `${event.title} | Amigo Secreto`,
      description: event.description || 'Consulte seu amigo secreto com CPF.',
    };
  } catch {
    return { title: 'Evento | Amigo Secreto' };
  }
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;
  const eventId = parseInt(id, 10);
  if (Number.isNaN(eventId)) notFound();

  let eventItem;
  try {
    eventItem = await getEvents(eventId);
  } catch {
    notFound();
  }

  if (!eventItem) notFound();

  if (!eventItem.status) {
    return (
      <EventUnavailable title={eventItem.title} />
    );
  }

  return (
    <PublicShell
      title={eventItem.title}
      description={eventItem.description}
      backHref="/"
      backLabel="Como funciona"
      narrow
    >
      <Search id={eventItem.id} />
    </PublicShell>
  );
}
