import { useEffect, useState } from 'react';
import { getGroups, getPeople } from '@/lib/api/admin';
import { Group } from '@/lib/types/Group';
import { PersonComplete } from '@/lib/types/PersonComplete';
import { FormSection } from '@/app/components/ui/FormSection';
import { SelectField } from '@/app/components/ui/SelectField';
import { GroupItemNotFound, GroupItemSkeleton } from '../groups/GroupItem';
import { PersonAdd } from './PersonAdd';
import { PersonEdit } from './PersonEdit';
import {
  PersonItem,
  PersonItemNotFound,
  PersonItemSkeleton,
} from '../people/PersonItem';

type Props = {
  eventId: number;
};

export const EventTabPeople = ({ eventId }: Props) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState(0);
  const [groupLoading, setGroupLoading] = useState(true);
  const [loadedGroupEventId, setLoadedGroupEventId] = useState<number | null>(
    null
  );
  const [people, setPeople] = useState<PersonComplete[]>([]);
  const [fetchedPeopleKey, setFetchedPeopleKey] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<PersonComplete | null>(
    null
  );

  const peopleKey =
    selectedGroupId > 0 ? `${eventId}-${selectedGroupId}` : '';
  const peopleLoading =
    peopleKey !== '' && fetchedPeopleKey !== peopleKey;
  const isGroupLoading = groupLoading || loadedGroupEventId !== eventId;

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const groupList = await getGroups(eventId);
      if (!cancelled) {
        setSelectedGroupId(0);
        setGroups(groupList);
        setLoadedGroupEventId(eventId);
        setGroupLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [eventId]);

  const loadPeople = async () => {
    if (selectedGroupId <= 0) return;

    setSelectedPerson(null);
    const key = `${eventId}-${selectedGroupId}`;
    setFetchedPeopleKey('');
    const peopleList = await getPeople(eventId, selectedGroupId);
    setPeople(peopleList);
    setFetchedPeopleKey(key);
  };

  useEffect(() => {
    if (selectedGroupId <= 0) return;

    let cancelled = false;
    const key = `${eventId}-${selectedGroupId}`;

    void (async () => {
      const peopleList = await getPeople(eventId, selectedGroupId);
      if (!cancelled) {
        setSelectedPerson(null);
        setPeople(peopleList);
        setFetchedPeopleKey(key);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [eventId, selectedGroupId]);

  return (
    <div className="space-y-4">
      <div>
        {!isGroupLoading && groups.length > 0 && (
          <SelectField
            label="Grupo"
            value={selectedGroupId}
            onChange={setSelectedGroupId}
            placeholder="Selecione um grupo"
            options={groups.map((group) => ({
              value: group.id,
              label: group.name,
            }))}
          />
        )}
        {isGroupLoading && <GroupItemSkeleton />}
        {!isGroupLoading && groups.length === 0 && <GroupItemNotFound />}
      </div>

      {selectedGroupId > 0 && (
        <>
          <FormSection
            title={selectedPerson ? 'Editar participante' : 'Novo participante'}
            description={
              selectedPerson
                ? 'Atualize nome e CPF do participante.'
                : 'Adicione quem vai participar deste grupo.'
            }
          >
            {!selectedPerson && (
              <PersonAdd
                eventId={eventId}
                groupId={selectedGroupId}
                refreshAction={loadPeople}
              />
            )}
            {selectedPerson && (
              <PersonEdit
                person={selectedPerson}
                refreshAction={loadPeople}
                onCancel={() => setSelectedPerson(null)}
              />
            )}
          </FormSection>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Participantes do grupo
            </p>
            {!peopleLoading &&
              people.length > 0 &&
              people.map((person) => (
                <PersonItem
                  key={person.id}
                  item={person}
                  refreschAction={loadPeople}
                  onEdit={setSelectedPerson}
                />
              ))}
            {peopleLoading && (
              <>
                <PersonItemSkeleton />
                <PersonItemSkeleton />
              </>
            )}
            {!peopleLoading && people.length === 0 && <PersonItemNotFound />}
          </div>
        </>
      )}
    </div>
  );
};
