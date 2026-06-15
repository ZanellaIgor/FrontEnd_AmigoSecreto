import { getCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';
import { api } from './axios';

export const pingAdmin = async () => {
  try {
    const token = await getCookie('token', { cookies });
    await api.get('admin/ping', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return true;
  } catch {
    return false;
  }
};
