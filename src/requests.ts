import axios, { AxiosResponse } from 'axios';

type Request = (url: string, data?: Record<string, unknown>) => Promise<AxiosResponse>;

const baseApiUrl = 'http://localhost:3030';

export const get: Request = url => axios.get(baseApiUrl + url);
export const del: Request = url => axios.delete(baseApiUrl + url);
export const post: Request = (url, data) => axios.post(baseApiUrl + url, data);

