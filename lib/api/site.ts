import { Event } from '@/lib/types/Event';
import { SearchResult } from '@/lib/types/SearchResult';
import { api } from './axios';

export const getEvents = async (id: number): Promise<Event> => {
  const json = await api.get(`/events/${id}`);
  return (json.data.event as Event) ?? false;
};

export const searchCPF = async (
  eventId: number,
  cpf: string
): Promise<SearchResult | false> => {
  const json = await api.get(`/events/${eventId}/search?cpf=${cpf}`);
  if (json.data.person && json.data.personMatched) {
    return json.data as SearchResult;
  }
  return false;
};
