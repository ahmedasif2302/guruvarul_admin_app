import axios from "axios";

export const baseUrl = axios.create({
  baseURL: 'http://172.105.62.44:3000/',
  timeout: 3000,
  headers: {
    'Referer': 'http://localhost:3006',
    'Content-Type': 'application/json',
  }
});