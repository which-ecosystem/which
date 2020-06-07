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

import SearchBar from './SearchBar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '60%',
    margin: 'auto'
  },
  logo: {
    fontWeight: 'bold',
  }
}));

const Header: React.FC = () => {
  const classes = useStyles();

  const handleChange = () => {};

  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <Typography variant="h5" className={classes.logo}>
          Which
        </Typography>
        <SearchBar />
        <div>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

