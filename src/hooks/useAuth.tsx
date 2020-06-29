import React, {
  useState, useEffect, useContext, createContext
} from 'react';
import { User } from 'which-types';
import { post, get } from '../requests';


interface ContextType {
  user: User | null,
  setUser: (user: User) => void;
  login: (username: string, password: string, remember?: boolean) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const authContext = createContext<ContextType>({
  user: null,
  setUser: () => {},
  login: async () => false,
  logout: () => {},
  isAuthenticated: () => false
});

const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string, remember = true): Promise<boolean> => {
    return post('/authentication', {
      strategy: 'local',
      username,
      password
    }).then(response => {
      const me = response.data.user;
      const token = response.data.accessToken;
      setUser(me);
      // navigate('profile', me._id);
      localStorage.setItem('userId', me._id);
      localStorage.setItem('token', token);
      if (!remember) localStorage.setItem('shouldClear', 'true');
      return true;
    }).catch(() => false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    // navigate('auth');
  };

  const isAuthenticated = () => Boolean(user);

  useEffect(() => {
    if (localStorage.getItem('shouldClear')) {
      localStorage.clear();
    }
    const userId = localStorage.getItem('userId');
    if (userId) {
      get(`/users/${userId}`).then(response => {
        setUser(response.data);
      });
    }
  }, []);

  return {
    user, setUser, login, logout, isAuthenticated
  };
};

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  const { Provider } = authContext;
  return <Provider value={auth}>{children}</Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

