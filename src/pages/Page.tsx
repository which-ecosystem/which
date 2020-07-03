import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { isMobile } from 'react-device-detect';

import ProfilePage from './ProfilePage/ProfilePage';
import FeedPage from './FeedPage/FeedPage';
import AuthPage from './AuthPage/AuthPage';
import HomePage from './HomePage/HomePage';
import NotificationsPage from './NotificationsPage/NotificationsPage';
import { useNavigate } from '../hooks/useNavigate';


const useStyles = makeStyles(theme => ({
  root: {
    margin: isMobile ? theme.spacing(5, 2) : theme.spacing(15, 5, 5, 8)
  }
}));

const Page: React.FC = () => {
  const { page } = useNavigate();
  const classes = useStyles();

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
    >
      <div className={classes.root}>
        { page.prefix === 'home' && <HomePage />}
        { page.prefix === 'profile' && <ProfilePage />}
        { page.prefix === 'feed' && <FeedPage /> }
        { page.prefix === 'auth' && <AuthPage /> }
        { page.prefix === 'notifications' && <NotificationsPage /> }
      </div>
    </SnackbarProvider>
  );
};


export default Page;

