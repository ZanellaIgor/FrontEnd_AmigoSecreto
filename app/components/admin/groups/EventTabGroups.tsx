import { useEffect, useState } from 'react';
import { Group } from '../../types/Group';
import { api } from '../../api/axios';
import { getGroups } from '../../api/admin';
import { EventItemNotFound, EventItemSkeleton } from '../events/EventItem';
import { GroupAdd } from './GroupAdd';
import { GroupItem } from './GroupItem';
import { GroupEdit } from './GroupEdit';

type Props = {
  eventId: number;
};
export const EventTabGroups = ({ eventId }: Props) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const loadGroups = async () => {
    setSelectedGroup(null);
    setLoading(true);
    const groupList = await getGroups(eventId);
    setLoading(false);
    setGroups(groupList);
  };

  useEffect(() => {
    loadGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);
  const handleEditButton = (group: Group) => {
    setSelectedGroup(group);
  };
  return (
    <div>
      <div className="border border-dashed p-3 my-3">
        {!selectedGroup && (
          <GroupAdd eventId={eventId} refreshAction={loadGroups} />
        )}
        {selectedGroup && (
          <GroupEdit group={selectedGroup} refreshAction={loadGroups} />
        )}
      </div>
      {!loading &&
        groups.length > 0 &&
        groups.map((item) => (
          <GroupItem
            key={item.id}
            item={item}
            refreshAction={loadGroups}
            onEdit={handleEditButton}
          />
        ))}
      {loading && (
        <>
          <EventItemSkeleton />
          <EventItemSkeleton />
        </>
      )}
      {!loading && groups.length === 0 && <EventItemNotFound />}
    </div>
  );
};
