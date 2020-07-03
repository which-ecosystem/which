import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography, Avatar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeIcon from '@material-ui/icons/Home';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from '../../hooks/useNavigate';

import SearchBar from './SearchBar';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '60%',
    margin: 'auto'
  },
  logo: {
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  avatar: {
    width: 24,
    height: 24
  }
});

const Header: React.FC = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const { navigate } = useNavigate();

  const handleHome = (): void => {
    navigate('home');
  };

  const handleFeed = (): void => {
    navigate('feed');
  };

  const handleProfile = (): void => {
    if (user) navigate('profile');
    else navigate('auth');
  };

  const handleNotifications = (): void => {
    navigate('notifications');
  };

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.root}>
        <Typography variant="h5" className={classes.logo} onClick={handleHome}>
          Which
        </Typography>
        <SearchBar />
        <div>
          <IconButton onClick={handleFeed}>
            <HomeIcon />
          </IconButton>
          <IconButton onClick={handleNotifications}>
            <NotificationsIcon />
          </IconButton>
          <IconButton onClick={handleProfile}>
            {
              user?.avatarUrl
                ? <Avatar className={classes.avatar} src={user?.avatarUrl} />
                : <AccountCircle />
            }
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

