import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://fly.io/apps/dwayno/api'
    : 'http://localhost:5000/api'; // or your dev server

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
