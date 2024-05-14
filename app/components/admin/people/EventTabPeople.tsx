import { useEffect, useState } from 'react';
import { Group } from '../../types/Group';
import { getGroups, getPeople } from '../../api/admin';
import { GroupItemNotFound, GroupItemSkeleton } from '../groups/GroupItem';
import { PersonComplete } from '../../types/PersonComplete';
import { PersonItemNotFound, PersonItemSkeleton } from './PersonItem';
import { PersonAdd } from './PersonAdd';

type Props = {
  eventId: number;
};
export const EventTabPeople = ({ eventId }: Props) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState(0);
  const [groupLoading, setGroupLoading] = useState(true);
  const [people, setPeople] = useState<PersonComplete[]>([]);
  const [peopleLoading, setPeopleLoading] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<PersonComplete | null>(
    null
  );

  const loadGroups = async () => {
    setSelectedGroupId(0);
    setGroupLoading(true);
    const groupList = await getGroups(eventId);
    setGroupLoading(false);
    setGroups(groupList);
  };

  useEffect(() => {
    loadGroups();
  }, []);

  //People
  const loadPeople = async () => {
    if (selectedGroupId > 0) {
      setPeopleLoading(true);
      setPeople([]);
      //setSelectedGroupId(0);
      const peopleList = await getPeople(eventId, selectedGroupId);
      console.log(peopleList);
      setPeopleLoading(false);
      setPeople(peopleList);
    }
  };

  useEffect(() => {
    console.log(selectedGroupId);
    loadPeople();
  }, [selectedGroupId]);

  return (
    <div>
      <div className="my-3">
        {!groupLoading && groups && groups.length > 0 && (
          <select
            className="w-full bg-gray-700 text-white text-xl p-3 outline-none"
            onChange={(e) => setSelectedGroupId(Number(e.target.value))}
          >
            <option value={0}>Selecione um grupo</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        )}
        {groupLoading && <GroupItemSkeleton />}
        {!groupLoading && groups && groups.length === 0 && (
          <GroupItemNotFound />
        )}
      </div>
      {selectedGroupId > 0 && (
        <>
          <div className="border border-dashed p-3 my-3">
            {!selectedPerson && (
              <PersonAdd
                eventId={eventId}
                groupId={selectedGroupId}
                refreshAction={loadPeople}
              />
            )}
          </div>
          {!peopleLoading &&
            people.length > 0 &&
            people.map((person) => (
              <div key={person.id} className="my-3">
                {person.name}
              </div>
            ))}
          {peopleLoading && (
            <>
              <PersonItemSkeleton />
              <PersonItemSkeleton />{' '}
            </>
          )}
          {!peopleLoading && people.length === 0 && <PersonItemNotFound />}
        </>
      )}
    </div>
  );
};
