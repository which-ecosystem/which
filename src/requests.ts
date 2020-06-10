import axios from 'axios';

const baseApiUrl = 'http://localhost:3030';

export const get = (url: string) => {
  return axios.get(baseApiUrl + url)
};

export const post = (url: string, data: object) => {
  return axios.post(baseApiUrl + url, data);
};

