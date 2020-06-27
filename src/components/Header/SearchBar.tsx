import React, { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User } from 'which-types';
import { get } from '../../requests';


const INTERVAL = 300;

const useStyles = makeStyles(theme => ({
  root: {
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '2px',
    padding: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center'
  }
}));

const SearchBar: React.FC = () => {
  const classes = useStyles();
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<User[]>([]);
  const [isReady, setIsReady] = useState<boolean>(true);
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);

  const sleep = () => {
    setIsReady(false);
    setTimeout(() => setIsReady(true), INTERVAL);
  };

  const fetchPolls = () => {
    sleep();
    get(`/users?username[$regex]=${query}`).then(response => {
      setResults(response.data);
    });
  }

  useEffect(() => {
    if (isReady && shouldRefetch) {
      fetchPolls();
      setShouldRefetch(false);
    }
  }, [isReady])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
    if (isReady) fetchPolls();
    else setShouldRefetch(true);
  };

  return (
    <div className={classes.root}>
      <SearchIcon />
      <InputBase
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};


export default SearchBar;

