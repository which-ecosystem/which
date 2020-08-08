import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { Switch, Route } from 'react-router-dom';

import ProfilePage from './ProfilePage/ProfilePage';
import FeedPage from './FeedPage/FeedPage';
import LoginPage from './LoginPage/LoginPage';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import HomePage from './HomePage/HomePage';
import NotificationsPage from './NotificationsPage/NotificationsPage';


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


const Page: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: isMobile ? 'top' : 'bottom',
        horizontal: 'right'
      }}
    >
      <div className={classes.root}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/registration" component={RegistrationPage} />
          <Route exact path="/feed" component={FeedPage} />
          <Route exact path="/notifications" component={NotificationsPage} />
          <Route path="/profile/:username" component={ProfilePage} />
        </Switch>
      </div>
    </SnackbarProvider>
  );
};


export default Page;

