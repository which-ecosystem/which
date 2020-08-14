import useSWR, { responseInterface } from 'swr';
import { User, Poll, Feedback } from 'which-types';
import { get } from '../requests';

type Response<T> = responseInterface<T, Error>;

const fetcher = (endpoint: string) => get(endpoint).then(response => response.data);

export const useUser = (username: string | null): Response<User> => {
  return useSWR(
    username && `/users?username=${username}`,
    (url: string) => get(url).then(response => response.data[0])
  ) as Response<User>;
};

export const useProfile = (id: string): Response<Poll[]> => {
  return useSWR(id && `/profiles/${id}`, fetcher) as Response<Poll[]>;
};

export const useFeed = (): Response<Poll[]> => {
  return useSWR('/feed', fetcher, { revalidateOnFocus: false }) as Response<Poll[]>;
};

export const useFeedback = (): Response<Feedback[]> => {
  return useSWR('/feedback', fetcher) as Response<Feedback[]>;
};
