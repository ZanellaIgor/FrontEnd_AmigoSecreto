'use client';
import { useEffect, useState } from 'react';

import { FaPlus } from 'react-icons/fa';
import { getEvents } from '../api/admin';
import { Event } from '../types/Event';
import { ModalScreens } from '../types/ModalScreens';
import { ItemButton } from './ItemButton';
import { Modal } from './Modal';
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
    const eventList = await getEvents();
    setLoading(false);
    setEvents(eventList);
  };

  const editEvent = (event: Event) => {
    setSelectedEvent(event);
    setModalScreen('edit');
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div>
      <div className="p-3 flex items-center">
        <h1 className="text-2xl flex-1">Eventos:</h1>
        <ItemButton
          IconElement={FaPlus}
          onClick={() => setModalScreen('add')}
        />
      </div>
      <div className="my-3">
        {!loading &&
          events.length > 0 &&
          events.map((item) => (
            <EventItem
              key={item.id}
              item={item}
              refreshAction={() => loadEvents()}
              openModal={(event) => editEvent(event)}
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
        <Modal onClose={() => setModalScreen(null)}>
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
