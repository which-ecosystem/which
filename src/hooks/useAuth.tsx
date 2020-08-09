import React, {
  useEffect, useCallback, useMemo, useContext, createContext
} from 'react';
import { User } from 'which-types';
import { post } from '../requests';
import { useUser } from './APIClient';
import useLocalStorage from './useLocalStorage';


interface ContextType {
  user: User | null,
  login: (username: string, password: string, remember?: boolean) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const authContext = createContext<ContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false
});

const useProvideAuth = () => {
  const [remember, setRemember] = useLocalStorage('remember');
  const [username, setUsername] = useLocalStorage('username');
  const [token, setToken] = useLocalStorage('token');
  const { data: user } = useUser(username);

  const isAuthenticated = useMemo(() => Boolean(username), [username]);

  const logout = useCallback(() => {
    setToken(null);
    setUsername(null);
  }, [setToken, setUsername]);

  useEffect(() => {
    // If should not remember, logout
    if (!remember) logout();
  }, [remember, logout]);


  const login: ContextType['login'] = (name, password, shouldRemember = true) => {
    return post('/authentication', {
      strategy: 'local',
      username: name,
      password
    }).then(response => {
      setToken(response.data.accessToken);
      setUsername(name);
      setRemember(shouldRemember ? 'true' : null);
      return true;
    }).catch(() => false);
  };

  return {
    user, login, logout, token, isAuthenticated
  };
};

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  const { Provider } = authContext;
  return <Provider value={auth}>{children}</Provider>;
};

export const useAuth = (): ContextType => {
  return useContext(authContext);
};

