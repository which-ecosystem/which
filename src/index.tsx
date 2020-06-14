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

import Header from './components/Header/Header';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import FeedPage from './pages/FeedPage/FeedPage';
import AuthPage from './pages/AuthPage/AuthPage';
import { User } from './types';
import { get } from './requests';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[700]
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
  const [page, setPage] = useState('feed');
  const [user, setUser] = React.useState<User | undefined>();
  const classes = useStyles();

  const logOut = () => {
    localStorage.removeItem('userId');
    setUser(undefined);
  };


  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      get(`/users/${userId}`).then(response => {
        setUser(response.data);
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header setPage={setPage} />
      <div className={classes.root}>
        {
          page === 'profile'
            ? (
              user
                ? <ProfilePage logOut={logOut} id={user?._id} />
                : <AuthPage setUser={setUser} />
            )
            : <FeedPage />
        }
      </div>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

