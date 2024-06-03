import axios from 'axios';

export const vehicleApi = axios.create({
  baseURL: 'http://192.168.43.169:3001',
});
