import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeIcon from '@material-ui/icons/Home';

import SearchBar from './SearchBar';

interface PropTypes {
  setPage: (newPage: string) => void;
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
  }
});

const Header: React.FC<PropTypes> = ({ setPage }) => {
  const classes = useStyles();

  const handleHome = (): void => {
    setPage('feed');
  };

  const handleProfile = (): void => {
    setPage('profile');
  };

  const handleNotifications = (): void => {};

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.root}>
        <Typography variant="h5" className={classes.logo}>
          Which
        </Typography>
        <SearchBar />
        <div>
          <IconButton onClick={handleHome}>
            <HomeIcon />
          </IconButton>
          <IconButton onClick={handleNotifications}>
            <NotificationsIcon />
          </IconButton>
          <IconButton onClick={handleProfile}>
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

