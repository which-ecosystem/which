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

import Header from './Components/Header/Header';
import Feed from './Components/Feed/Feed';
import ProfileInfo from './Pages/ProfilePage/ProfileInfo';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import SignInForm from './Pages/ProfilePage/SignInForm';
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
          page === 'profile' ?  <ProfilePage id={user?._id || ''} setUser={setUser} user={user} /> : <Feed page={page} />
        }
      </div>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

