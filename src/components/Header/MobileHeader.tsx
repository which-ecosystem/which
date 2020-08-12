import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  useScrollTrigger,
  Slide
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search, Clear } from '@material-ui/icons';
import SearchBar from './SearchBar';

interface PropTypes {
  menu: JSX.Element;
  logo: JSX.Element;
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
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const { menu, logo } = props;

  const handleToggle = () => {
    setIsSearchOpen(value => !value);
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar position="fixed">
        <Toolbar className={classes.root}>
          {menu}
          {isSearchOpen ? <SearchBar callback={handleToggle} /> : logo}
          <IconButton onClick={handleToggle}>
            {isSearchOpen ? <Clear /> : <Search />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Slide>
  );
});

export default MobileHeader;

