import React, { useState, useContext, createContext } from 'react';
import { User } from 'which-types';

export interface Page {
  prefix: string;
  id?: string;
}

interface ContextType {
  page: Page;
  setPage: (page: Page) => void;
  navigate: (prefix: string, id?: string) => void;
}

const landingPage = { prefix: 'feed' };

const context = createContext<ContextType>({
  page: landingPage,
  setPage: () => {},
  navigate: () => {}
});

const useProvideNavigation = () => {
  const [page, setPage] = useState<Page>(landingPage);

  const navigate = (prefix: string, id?: string): void => {
    setPage({ prefix, id });
  };

  return { page, setPage, navigate };
};

export const NavigationProvider: React.FC = ({ children }) => {
  const navigation = useProvideNavigation();
  const { Provider } = context;
  return <Provider value={navigation}>{children}</Provider>;
};

export const useNavigate = () => {
  return useContext(context);
}

