import React, { useState } from 'react';
import { Event } from '../../types/Event';
import { EventTabInfo } from './EventTabInfo';

type Props = {
  event: Event | undefined;
  refreshAction: () => void;
};

export const EventEdit = ({ event, refreshAction }: Props) => {
  const [tab, setTab] = useState<'info' | 'groups' | 'people'>('info');
  if (!event) return;

  return (
    <div>
      <div className="flex text-center border-b border-gray-500 cursor-pointer">
        <div
          onClick={() => setTab('info')}
          className={`flex-1 p-3 hover:bg-gray-700 ${
            tab === 'info' ? 'bg-gray-600' : ''
          }`}
        >
          Informações
        </div>
        <div
          onClick={() => setTab('groups')}
          className={`flex-1 p-3 hover:bg-gray-700 ${
            tab === 'groups' ? 'bg-gray-600' : ''
          }`}
        >
          Grupos
        </div>
        <div
          onClick={() => setTab('people')}
          className={`flex-1 p-3 hover:bg-gray-700 ${
            tab === 'people' ? 'bg-gray-600' : ''
          }`}
        >
          Pessoas
        </div>
      </div>
      <div>
        {tab === 'info' && (
          <EventTabInfo event={event} refreshAction={refreshAction} />
        )}
        {tab === 'groups' && <></>}
        {tab === 'people' && <></>}
      </div>
    </div>
  );
};
