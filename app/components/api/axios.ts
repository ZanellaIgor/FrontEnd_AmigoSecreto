import axios from 'axios';

export const api = axios.create({
  baseURL: `${process.env.HOST}`,
  headers: {
    'Content-Type': 'application/json',
  },
});