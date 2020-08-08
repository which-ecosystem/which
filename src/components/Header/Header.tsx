import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  useMediaQuery
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeIcon from '@material-ui/icons/Home';

import { useAuth } from '../../hooks/useAuth';
import SearchBar from './SearchBar';


const useStyles = makeStyles(theme => ({
  mobile: {
    top: 'auto',
    bottom: 0
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  browserToolbar: {
    width: '60%',
    margin: 'auto'
  },
  logo: {
    fontWeight: 'bold',
    cursor: 'pointer',
    color: 'white'
  },
  round: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}));


const Header: React.FC = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const theme = useTheme();
  const history = useHistory();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleHome = (): void => {
    history.push('/');
  };

  const handleFeed = (): void => {
    history.push('/feed')
  };

  const handleProfile = (): void => {
    if (user) history.push(`/profile/${user.username}`);
    else history.push('/login');
  };

  const handleNotifications = (): void => {
    history.push('/notifications');
  };

  const FeedButton = (
    <IconButton onClick={handleFeed}>
      <HomeIcon />
    </IconButton>
  );

  const NotificationsButton = (
    <IconButton onClick={handleNotifications}>
      <NotificationsIcon />
    </IconButton>
  );

  const ProfileButton = (
    <IconButton onClick={handleProfile}>
      {
        user?.avatarUrl
          ? <Avatar className={classes.round} src={user?.avatarUrl} />
          : <AccountCircle />
      }
    </IconButton>
  );

  const BrowserVersion = (
    <AppBar position="fixed">
      <Toolbar className={`${classes.toolbar} ${classes.browserToolbar}`}>
        <Typography variant="h5" className={classes.logo} onClick={handleHome}>
          Which
        </Typography>
        <SearchBar />
        <div>
          {FeedButton}
          {NotificationsButton}
          {ProfileButton}
        </div>
      </Toolbar>
    </AppBar>
  );

  const MobileVersion = (
    <AppBar position="fixed" className={classes.mobile}>
      <Toolbar className={classes.toolbar}>
        <IconButton onClick={handleHome}>
          <Typography className={`${classes.logo} ${classes.round}`}>W</Typography>
        </IconButton>
        {FeedButton}
        {NotificationsButton}
        {ProfileButton}
      </Toolbar>
    </AppBar>
  );

  return isMobile ? MobileVersion : BrowserVersion;
};

export default Header;

