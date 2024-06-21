import axios from 'axios';

export const vehicleApi = axios.create({
  // baseURL: 'http://192.168.43.169:3001',
  baseURL: 'https://643990d44660f26eb1b66cd3.mockapi.io',
});
