import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from './SearchBar';

interface PropTypes {
  logo: JSX.Element;
  menu: JSX.Element;
  feed: JSX.Element;
  notifications: JSX.Element;
  profile: JSX.Element;
}

const useStyles = makeStyles({
  root: {
    width: '60%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-around'
  },
  group: {
    display: 'flex',
    alignItems: 'center'
  }
});


const BrowserHeader: React.FC<PropTypes> = React.memo(props => {
  const classes = useStyles();
  const {
    logo,
    menu,
    feed,
    notifications,
    profile
  } = props;

  return (
    <AppBar position="fixed">
      <Toolbar>
        {menu}
        <div className={classes.root}>
          <div className={classes.group}>
            {logo}
          </div>
          <SearchBar />
          <div className={classes.group}>
            {feed}
            {notifications}
            {profile}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
});

export default BrowserHeader;

