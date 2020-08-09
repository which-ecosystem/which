import useSWR from 'swr';
import { get } from '../requests';


const fetcher = (endpoint: string) => get(endpoint).then(response => response.data);


export const useUser = (username: string) => {
  return useSWR(
    `/users?username=${username}`,
    (url: string) => get(url).then(response => response.data[0])
  );
};

export const useProfile = (id: string) => {
  return useSWR(id && `/profiles/${id}`, fetcher, { initialData: [] });
};
