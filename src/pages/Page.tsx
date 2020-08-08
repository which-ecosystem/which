import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { Switch } from 'react-router-dom';

import ProfilePage from './ProfilePage/ProfilePage';
import FeedPage from './FeedPage/FeedPage';
import LoginPage from './LoginPage/LoginPage';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import HomePage from './HomePage/HomePage';
import NotificationsPage from './NotificationsPage/NotificationsPage';
import Route from './Route';
import urls from './urls';


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
          <Route exact path={urls.home} component={HomePage} />
          <Route exact path={urls.login} component={LoginPage} />
          <Route exact path={urls.registration} component={RegistrationPage} />
          <Route exact path={urls.feed} component={FeedPage} />
          <Route exact path={urls.notifications} component={NotificationsPage} />
          <Route path={urls.profile(':username')} component={ProfilePage} />
        </Switch>
      </div>
    </SnackbarProvider>
  );
};


export default Page;

