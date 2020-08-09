import useSWR from 'swr';
import { get } from '../requests';


const fetcher = (endpoint: string) => get(endpoint).then(response => response.data);

const arrayOptions = {
  initialData: [],
  revalidateOnMount: true
};

export const useUser = (username: string | null) => {
  return useSWR(
    username && `/users?username=${username}`,
    (url: string) => get(url).then(response => response.data[0])
  );
};

export const useProfile = (id: string) => {
  return useSWR(id && `/profiles/${id}`, fetcher, arrayOptions);
};

export const useFeed = () => {
  return useSWR('/feed', fetcher, arrayOptions);
};
