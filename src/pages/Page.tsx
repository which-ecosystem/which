import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ProfilePage from './ProfilePage/ProfilePage';
import FeedPage from './FeedPage/FeedPage';
import AuthPage from './AuthPage/AuthPage';
import HomePage from './HomePage/HomePage';
import NotificationsPage from './NotificationsPage/NotificationsPage';
import { useNavigate } from '../hooks/useNavigate';
import PrivateRoute from './PrivateRoute';


const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2, 0, 12, 0)
    },
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(15, 5, 8, 5)
    }
  }
}));


const urls = {
  home: '/',
  login: '/login',
  registration: '/registration',
  profile: '/profile',
  feed: '/feed',
  notifications: '/notifications'
};

const Page: React.FC = () => {
  const { page } = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: isMobile ? 'top' : 'bottom',
          horizontal: 'right'
        }}
      >
        <div className={classes.root}>
          <Switch>
            <PrivateRoute exact path={urls.home} component={HomePage} />
            <PrivateRoute exact path={urls.login} component={AuthPage} />
            <PrivateRoute exact path={urls.registration} component={AuthPage} />
            <PrivateRoute exact path={urls.feed} component={FeedPage} />
            <PrivateRoute exact path={urls.notifications} component={NotificationsPage} />
          </Switch>
        </div>
      </SnackbarProvider>
    </BrowserRouter>
  );
};


export default Page;

