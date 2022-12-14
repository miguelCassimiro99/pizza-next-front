import { parseCookies } from 'nookies';
import axios from 'axios';

export function getAPIClient(ctx?: any) {

  const { 'access_token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3333/'
  })

  if(token) api.defaults.headers['Authorization'] = `Bearer ${token}`

  return api;
}