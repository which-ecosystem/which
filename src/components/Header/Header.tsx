import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  IconButton,
  Typography,
  useMediaQuery
} from '@material-ui/core';
import {
  AccountCircle,
  Notifications,
  Home,
  Menu
} from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useAuth } from '../../hooks/useAuth';
import MobileHeader from './MobileHeader';
import BottomBar from './BottomBar';
import BrowserHeader from './BrowserHeader';
import Drawer from '../Drawer/Drawer';


const useStyles = makeStyles(theme => ({
  logo: {
    fontWeight: 'bold',
    cursor: 'pointer',
    color: 'white'
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  activeIcon: {
    color: 'white'
  }
}));

const Header: React.FC = React.memo(() => {
  const classes = useStyles();
  const { user } = useAuth();
  const theme = useTheme();
  const history = useHistory();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [path, setPath] = useState<string>(useLocation().pathname);


  useEffect(() => {
    return history.listen(location => {
      setPath(location.pathname);
    });
  }, [history]);

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

  const handleMenu = (): void => {
    setIsDrawerOpen(true);
  };

  const feed = (
    <IconButton onClick={handleFeed}>
      <Home className={path === '/feed' ? classes.activeIcon : ''} />
    </IconButton>
  );

  const notifications = (
    <IconButton onClick={handleNotifications}>
      <Notifications className={path === '/notifications' ? classes.activeIcon : ''} />
    </IconButton>
  );

  const menu = (
    <IconButton onClick={handleMenu}>
      <Menu />
    </IconButton>
  );

  const logo = (
    <Typography variant="h5" className={classes.logo} onClick={handleHome}>
      Which
    </Typography>
  );

  const profile = (
    <IconButton onClick={handleProfile}>
      <AccountCircle className={[classes.avatar, path.includes('/profile') ? classes.activeIcon : ''].join(' ')} />
    </IconButton>
  );

  return isMobile ? (
    <>
      <MobileHeader logo={logo} menu={menu} />
      <BottomBar feed={feed} profile={profile} notifications={notifications} />
      <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </>
  ) : (
    <>
      <BrowserHeader menu={menu} logo={logo} profile={profile} notifications={notifications} feed={feed} />
      <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </>
  );
});

export default Header;

