import axios from 'axios';
import { store } from '../../store'

const setTokenToRequest = function(config) {
  config.headers.Authorization = `Bearer ${store.getters["auth/getToken"]}`
  return config;
}

const refreshToken = function (response) {

  let token = response.headers['x-jwt-refresh'];

  if(token)
    store.dispatch('auth/setToken', token);

  return response
}

axios.interceptors.request.use(setTokenToRequest);
axios.interceptors.response.use(refreshToken);

export default axios;
