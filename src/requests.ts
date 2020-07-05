import axios from 'axios';
import _ from 'lodash';

const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://which-api.herokuapp.com'
  : 'http://localhost:3030';

const requests = axios.create({ baseURL });

requests.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  return _.set(config, 'headers.Authorization', token);
});

requests.interceptors.response.use(response => response, error => {
  if (error.message === 'Request failed with status code 401' && localStorage.getItem('token')) {
    localStorage.setItem('shouldClear', 'true');
    window.location.reload();
  }
  return Promise.reject(error);
});

export const {
  get, post, put, patch
} = requests;
export default requests;

