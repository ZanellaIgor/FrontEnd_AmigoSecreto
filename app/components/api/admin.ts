import { api } from './axios';
export const login = async (password: string) => {
  try {
    const json = await api.post('admin/login', { password });
    return (json.data.token as string) ?? false;
  } catch (error) {
    return false;
  }
};
