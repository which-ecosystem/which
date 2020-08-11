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
import {
  AccountCircle,
  Notifications,
  Home,
  Menu,
  Search,
} from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useAuth } from '../../hooks/useAuth';
import SearchBar from './SearchBar';
import MobileHeader from './MobileHeader';
import BottomBar from './BottomBar';


const useStyles = makeStyles(theme => ({
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

const Header: React.FC = React.memo(() => {
  const classes = useStyles();
  const { user } = useAuth();
  const theme = useTheme();
  const history = useHistory();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleHome = (): void => {
    history.push('/');
  };

  const handleFeed = (): void => {
    history.push('/feed');
  };

  const handleProfile = (): void => {
    if (user) history.push(`/profile/${user.username}`);
    else history.push('/login');
  };

  const handleNotifications = (): void => {
    history.push('/notifications');
  };

  const feed = (
    <IconButton onClick={handleFeed}>
      <Home />
    </IconButton>
  );

  const notifications = (
    <IconButton onClick={handleNotifications}>
      <Notifications />
    </IconButton>
  );

  const menu = (
    <IconButton>
      <Menu />
    </IconButton>
  );

  const search = (
    <IconButton onClick={handleNotifications}>
      <Search />
    </IconButton>
  );

  const logo = (
    <Typography variant="h5" className={classes.logo} onClick={handleHome}>
      Which
    </Typography>
  );

  const profile= (
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
        {logo}
        <SearchBar />
        <div>
          {feed}
          {notifications}
          {profile}
        </div>
      </Toolbar>
    </AppBar>
  );

  return isMobile ? (
    <>
      <MobileHeader logo={logo} menu={menu} search={search} />
      <BottomBar feed={feed} profile={profile} notifications={notifications} />
    </>
  ) : BrowserVersion;
});

export default Header;

