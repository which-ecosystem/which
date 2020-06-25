import axios from 'axios';

const requests = axios.create({
  baseURL: 'http://localhost:3030',
});

requests.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
});

export const { get, post, put } = requests;
export default requests;

