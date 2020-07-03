import React, { useState, useContext, createContext } from 'react';

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

  const navigate: ContextType['navigate'] = (prefix, id?) => {
    setPage({ prefix, id });
    window.scrollTo(0, 0);
  };

  return { page, setPage, navigate };
};

export const NavigationProvider: React.FC = ({ children }) => {
  const navigation = useProvideNavigation();
  const { Provider } = context;
  return <Provider value={navigation}>{children}</Provider>;
};

export const useNavigate = (): ContextType => {
  return useContext(context);
};

