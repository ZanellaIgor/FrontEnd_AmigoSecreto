'use client';

import { useEffect, useRef, useState } from 'react';
import { Event } from '@/lib/types/Event';
import { EventTabInfo } from './EventTabInfo';
import { EventTabGroups } from '../groups/EventTabGroups';
import { EventTabPeople } from '../people/EventTabPeople';

type Props = {
  event: Event | undefined;
  refreshAction: () => void;
};

type Tab = 'info' | 'groups' | 'people';

const tabs: { id: Tab; label: string }[] = [
  { id: 'info', label: 'Informações' },
  { id: 'groups', label: 'Grupos' },
  { id: 'people', label: 'Pessoas' },
];

export const EventEdit = ({ event, refreshAction }: Props) => {
  const [tab, setTab] = useState<Tab>('info');
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.scrollTo(0, 0);
  }, [tab]);

  if (!event) return null;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        className="mb-4 flex shrink-0 gap-1 rounded-xl border border-gray-800 bg-gray-950/60 p-1"
        role="tablist"
        aria-label="Seções do evento"
      >
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              tab === id
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        ref={panelRef}
        role="tabpanel"
        className="panel-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1"
      >
        {tab === 'info' && (
          <EventTabInfo event={event} refreshAction={refreshAction} />
        )}
        {tab === 'groups' && <EventTabGroups eventId={event.id} />}
        {tab === 'people' && <EventTabPeople eventId={event.id} />}
      </div>
    </div>
  );
};
