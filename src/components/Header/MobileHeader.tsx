import React from 'react';
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Slide
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface PropTypes {
  menu: JSX.Element;
  logo: JSX.Element;
  search: JSX.Element;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});


const MobileHeader: React.FC<PropTypes> = React.memo(props => {
  const classes = useStyles();
  const trigger = useScrollTrigger();
  const { menu, search, logo } = props;

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar position="fixed">
        <Toolbar className={classes.root}>
          {menu}
          {logo}
          {search}
        </Toolbar>
      </AppBar>
    </Slide>
  );
});

export default MobileHeader;

