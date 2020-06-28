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

import SearchBar from './SearchBar';

interface PropTypes {
  userImage: string | undefined;
  navigate: (prefix: string) => void;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '60%',
    margin: 'auto'
  },
  logo: {
    fontWeight: 'bold'
  },
  avatar: {
    width: 24,
    height: 24
  }
});

const Header: React.FC<PropTypes> = ({ navigate, userImage }) => {
  const classes = useStyles();

  const handleHome = (): void => {
    navigate('feed');
  };

  const handleProfile = (): void => {
    navigate('profile');
  };

  const handleNotifications = (): void => {};

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.root}>
        <Typography variant="h5" className={classes.logo}>
          Which
        </Typography>
        <SearchBar navigate={navigate} />
        <div>
          <IconButton onClick={handleHome}>
            <HomeIcon />
          </IconButton>
          <IconButton onClick={handleNotifications}>
            <NotificationsIcon />
          </IconButton>
          <IconButton onClick={handleProfile}>
            {
              userImage !== undefined
                ? <Avatar className={classes.avatar} src={userImage} />
                : <AccountCircle />
            }
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

