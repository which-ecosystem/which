import axios from 'axios';
import _ from 'lodash';

const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://which-api.herokuapp.com'
  : 'http://localhost:3030';

const headers = ['Access-Control-Allow-Origin', '*'];
const requests = axios.create({ baseURL, headers });

requests.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  return _.set(config, 'headers.Authorization', token);
});

export const {
  get, post, put, patch
} = requests;
export default requests;

