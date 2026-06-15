'use client';

import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'sonner';
import { getEvents } from '@/lib/api/admin';
import { Event } from '@/lib/types/Event';
import { ModalScreens } from '@/lib/types/ModalScreens';
import { Modal } from '@/app/components/ui/Modal';
import { EventAdd } from './events/EventAdd';
import { EventEdit } from './events/EventEdit';
import {
  EventItem,
  EventItemNotFound,
  EventItemSkeleton,
} from './events/EventItem';

export const AdminPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalScreen, setModalScreen] = useState<ModalScreens>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event>();

  const loadEvents = async () => {
    setModalScreen(null);
    setLoading(true);
    try {
      const eventList = await getEvents();
      setEvents(eventList);
    } catch {
      toast.error('Não foi possível carregar os eventos');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const eventList = await getEvents();
        if (!cancelled) {
          setEvents(eventList);
        }
      } catch {
        if (!cancelled) {
          toast.error('Não foi possível carregar os eventos');
          setEvents([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Eventos</h2>
          <p className="text-sm text-gray-400">
            Gerencie sorteios, grupos e participantes
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalScreen('add')}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-600 text-lg text-white shadow-lg shadow-amber-900/30 transition-transform hover:scale-105 hover:bg-amber-500 cursor-pointer"
          aria-label="Novo evento"
        >
          <FaPlus aria-hidden />
        </button>
      </div>

      <div className="space-y-3">
        {!loading &&
          events.length > 0 &&
          events.map((item) => (
            <EventItem
              key={item.id}
              item={item}
              refreshAction={() => loadEvents()}
              openModal={(event) => {
                setSelectedEvent(event);
                setModalScreen('edit');
              }}
            />
          ))}
        {!loading && events.length === 0 && <EventItemNotFound />}
        {loading && (
          <>
            <EventItemSkeleton />
            <EventItemSkeleton />
          </>
        )}
      </div>

      {modalScreen && (
        <Modal
          onClose={() => setModalScreen(null)}
          title={
            modalScreen === 'add'
              ? 'Novo evento'
              : (selectedEvent?.title ?? 'Editar evento')
          }
          description={
            modalScreen === 'add'
              ? 'Preencha os dados abaixo para começar.'
              : 'Use as abas para gerenciar este sorteio.'
          }
          size={modalScreen === 'edit' ? 'lg' : 'md'}
          fixedHeight={modalScreen === 'edit'}
        >
          {modalScreen === 'add' && (
            <EventAdd refreshAction={() => loadEvents()} />
          )}
          {modalScreen === 'edit' && (
            <EventEdit
              event={selectedEvent}
              refreshAction={() => loadEvents()}
            />
          )}
        </Modal>
      )}
    </div>
  );
};
