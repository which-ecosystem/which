import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '2px',
    padding: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
    // marginRight: theme.spacing(8),
  }
}));

const SearchBar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SearchIcon />
      <InputBase
        placeholder="Search..."
      />
    </div>
  );
};


export default SearchBar;

