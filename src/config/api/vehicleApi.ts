import axios from 'axios';

export const vehicleApi = axios.create({
  baseURL: 'http://192.168.1.101:3001',
});
