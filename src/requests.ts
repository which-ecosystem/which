import axios from 'axios';
import _ from 'lodash';

const requests = axios.create({
  baseURL: 'http://localhost:3030'
});

requests.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  return _.set(config, 'headers.Authorization', token);
});

export const { get, post, put, patch } = requests;
export default requests;

