import { Event } from '../types/Event';
import { api } from './axios';

export const getEvents = async (id: number): Promise<Event> => {
  const json = await api.get(`/events/${id}`);
  console.log(json);
  return (json.data.events as Event) ?? false;
};
