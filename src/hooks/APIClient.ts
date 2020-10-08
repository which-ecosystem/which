import useSWR, { responseInterface } from 'swr';
import { User, Poll, Feedback } from 'which-types';
import axios from 'axios';
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

interface Release {
  url: string;
  description: string;
  version: string;
  name: string;
}

export const usePatchNotes = (): Response<Release> => {
  const fetchRelease = () => axios.get('https://api.github.com/repos/which-ecosystem/which/releases/latest')
    .then(({ data }) => ({
      name: data.name,
      url: data.html_url,
      version: data.tag_name,
      description: data.body
    }));
  return useSWR('/patchnotes', fetchRelease, { revalidateOnFocus: false });
};
