import { useEffect, useState } from 'react';
import { getGroups } from '@/lib/api/admin';
import { Group } from '@/lib/types/Group';
import { FormSection } from '@/app/components/ui/FormSection';
import { EventItemNotFound, EventItemSkeleton } from '../events/EventItem';
import { GroupAdd } from './GroupAdd';
import { GroupEdit } from './GroupEdit';
import { GroupItem } from './GroupItem';

type Props = {
  eventId: number;
};

export const EventTabGroups = ({ eventId }: Props) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadedEventId, setLoadedEventId] = useState<number | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const isLoading = loading || loadedEventId !== eventId;

  const loadGroups = async () => {
    setSelectedGroup(null);
    setLoading(true);
    const groupList = await getGroups(eventId);
    setGroups(groupList);
    setLoadedEventId(eventId);
    setLoading(false);
  };

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const groupList = await getGroups(eventId);
      if (!cancelled) {
        setSelectedGroup(null);
        setGroups(groupList);
        setLoadedEventId(eventId);
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [eventId]);

  return (
    <div className="space-y-4">
      <FormSection
        title={selectedGroup ? 'Editar grupo' : 'Novo grupo'}
        description={
          selectedGroup
            ? 'Altere o nome e salve as mudanças.'
            : 'Crie grupos para organizar o sorteio.'
        }
      >
        {!selectedGroup && (
          <GroupAdd eventId={eventId} refreshAction={loadGroups} />
        )}
        {selectedGroup && (
          <GroupEdit
            group={selectedGroup}
            refreshAction={loadGroups}
            onCancel={() => setSelectedGroup(null)}
          />
        )}
      </FormSection>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Grupos cadastrados
        </p>
        {!isLoading &&
          groups.length > 0 &&
          groups.map((item) => (
            <GroupItem
              key={item.id}
              item={item}
              refreshAction={loadGroups}
              onEdit={setSelectedGroup}
            />
          ))}
        {isLoading && (
          <>
            <EventItemSkeleton />
            <EventItemSkeleton />
          </>
        )}
        {!isLoading && groups.length === 0 && <EventItemNotFound />}
      </div>
    </div>
  );
};
