import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import teal from '@material-ui/core/colors/teal';
import 'typeface-roboto';

import Header from './Header/Header';
import Feed from './Feed/Feed';
import ProfileInfo from './ProfileInfo/ProfileInfo';

import SignInForm from './Form/SignInForm';
import { User } from './types';

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header setPage={setPage} />
      <div className={classes.root}>
        {
          page === 'profile'
            ? (
              user
                ? (
                  <>
                    <ProfileInfo id={user?._id || ''} setUser={setUser} />
                    <Feed page={page} />
                  </>
                )
                : <SignInForm setUser={setUser} />
            )
            : <Feed page={page} />
        }
      </div>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

