import useSWR, { responseInterface } from 'swr';
import { User, Poll, Feedback } from 'which-types';
import { get } from '../requests';


interface Response<T> extends responseInterface<T, Error> {
  data: T;
}

const fetcher = (endpoint: string) => get(endpoint).then(response => response.data);

const arrayOptions = {
  initialData: [],
  revalidateOnMount: true
};

export const useUser = (username: string | null): Response<User> => {
  return useSWR(
    username && `/users?username=${username}`,
    (url: string) => get(url).then(response => response.data[0])
  ) as Response<User>;
};

export const useProfile = (id: string): Response<Poll[]> => {
  return useSWR(id && `/profiles/${id}`, fetcher, arrayOptions) as Response<Poll[]>;
};

export const useFeed = (): Response<Poll[]> => {
  return useSWR('/feed', fetcher, { ...arrayOptions, revalidateOnFocus: false }) as Response<Poll[]>;
};

export const useFeedback = (): Response<Feedback[]> => {
  return useSWR('/feedback', fetcher, arrayOptions) as Response<Feedback[]>;
};
