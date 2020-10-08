import useSWR, { responseInterface } from 'swr';
import { User, Poll, Feedback } from 'which-types';
import { get } from '../requests';

type Response<T> = responseInterface<T, Error>;

const fetcher = (endpoint: string) => get(endpoint).then(response => response.data);

export const useUser = (username: string | null): Response<User> => {
  return useSWR(
    username && `/users?username=${username}`,
    (url: string) => get(url).then(response => response.data[0])
  );
};

export const useProfile = (username: string): Response<Poll[]> => {
  return useSWR(username && `/profiles/${username}`, fetcher);
};

export const useFeed = (): Response<Poll[]> => {
  return useSWR('/feed', fetcher, { revalidateOnFocus: false });
};

export const useFeedback = (): Response<Feedback[]> => {
  return useSWR('/feedback', fetcher);
};
