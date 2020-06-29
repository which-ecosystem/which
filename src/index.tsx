import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import teal from '@material-ui/core/colors/teal';
import 'typeface-roboto';

import { User } from 'which-types';
import Header from './components/Header/Header';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import FeedPage from './pages/FeedPage/FeedPage';
import AuthPage from './pages/AuthPage/AuthPage';
import { Page } from './types';
import { get, post } from './requests';
import ScrollTopArrow from './components/ScrollTopArrow/ScrollTopArrow';
import { useAuth, AuthProvider } from './hooks/useAuth';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[700],
      light: teal[100]
    }
  }
});

const useStyles = makeStyles({
  root: {
    width: theme.spacing(75),
    marginTop: theme.spacing(15),
    margin: '0 auto'
  }
});

const App: React.FC = () => {
  const [page, setPage] = useState<Page>({ prefix: 'feed', id: '' });
  const classes = useStyles();
  const { user } = useAuth();

  const navigate = (prefix: string, id?: string): void => {
    if (prefix === 'profile' && !id && !user) {
      setPage({
        prefix: 'auth',
        id: ''
      });
    } else {
      setPage({
        prefix,
        id: (id || user?._id || '')
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header navigate={navigate} />
      <div className={classes.root}>
        { page.prefix === 'profile' && (
          <ProfilePage
            id={page.id}
            navigate={navigate}
          />
        ) }
        { page.prefix === 'feed' && <FeedPage navigate={navigate} /> }
        { page.prefix === 'auth' && <AuthPage /> }
      </div>
      <ScrollTopArrow />
    </ThemeProvider>

  );
};

ReactDOM.render(<AuthProvider> <App /> </AuthProvider>, document.getElementById('root'));

