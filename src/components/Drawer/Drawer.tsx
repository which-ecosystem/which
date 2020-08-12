import React, { useMemo, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  SwipeableDrawer,
  List,
  ListItem,
  Typography,
  Divider
} from '@material-ui/core';
import { ExitToApp as LogoutIcon, Info } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import UserInfo from './UserInfo';
import { useAuth } from '../../hooks/useAuth';

interface PropTypes {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const useStyles = makeStyles(theme => ({
  item: {
    padding: theme.spacing(2, 14, 2, 2)
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}));


const Drawer: React.FC<PropTypes> = React.memo(({ isOpen, setIsOpen }) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, logout } = useAuth();

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    // Close drawer on navigations
    return history.listen(() => handleClose());
  }, [history, handleClose]);

  const handleLogout = useCallback(() => {
    logout();
    history.push('/login');
  }, [logout, history]);

  const handleAbout = useCallback(() => {
    history.push('/');
  }, [history]);

  const iOS = useMemo(() => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }, []);

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      {user && <UserInfo user={user} />}
      <Divider />
      <List>
        {user && (
          <ListItem button className={classes.item} onClick={handleLogout}>
            <LogoutIcon className={classes.icon} />
            <Typography>Logout</Typography>
          </ListItem>
        )}
        <ListItem button className={classes.item} onClick={handleAbout}>
          <Info className={classes.icon} />
          <Typography>About</Typography>
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
});

export default Drawer;

