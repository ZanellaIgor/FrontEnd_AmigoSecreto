import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { api } from './axios';

export const pingAdmin = async () => {
  try {
    const token = getCookie('token', { cookies });
    await api.get('admin/ping', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  } catch (err) {
    return false;
  }
};
