import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface PropTypes {
  profile: JSX.Element;
  feed: JSX.Element;
  notifications: JSX.Element;
}

const useStyles = makeStyles({
  root: {
    top: 'auto',
    bottom: 0
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-around'
  }
});


const BottomBar: React.FC<PropTypes> = React.memo(props => {
  const classes = useStyles();
  const { profile, feed, notifications } = props;

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        {notifications}
        {feed}
        {profile}
      </Toolbar>
    </AppBar>
  );
});

export default BottomBar;

