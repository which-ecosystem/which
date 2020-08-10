import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import {
  InputBase,
  List,
  ListItem,
  Paper,
  Divider,
  ClickAwayListener
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User } from 'which-types';

import { get } from '../../requests';
import UserStrip from '../UserStrip/UserStrip';

const INTERVAL = 300;
const LIMIT = 7;

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '2px',
    padding: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center'
  },
  results: {
    position: 'absolute',
    width: '100%',
    top: theme.spacing(5)
  },
  listItem: {
    padding: 0
  }
}));

const SearchBar: React.FC = React.memo(() => {
  const [results, setResults] = useState<User[]>([]);
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), INTERVAL);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const fetchPolls = () => {
      get(`/users?username[$regex]=${debouncedQuery}&$limit=${LIMIT}`)
        .then(response => setResults(response.data))
        .catch(() => setResults([]));
    };
    if (debouncedQuery) fetchPolls();
    else setResults([]);
  }, [debouncedQuery]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value.trim());
  };

  const handleClose = () => {
    setDebouncedQuery('');
    setQuery('');
  };

  const handleNavigate = (index: number) => () => {
    const { username } = results[index];
    history.push(`/profile/${username}`);
    handleClose();
  };

  const SearchResults = (
    <ClickAwayListener onClickAway={handleClose}>
      <Paper className={classes.results}>
        <List>
          {
          results.map((result, index) => (
            <div key={result._id}>
              <ListItem button onClick={handleNavigate(index)} className={classes.listItem}>
                <UserStrip user={result} />
              </ListItem>
              {(index < results.length - 1) && <Divider />}
            </div>
          ))
        }
        </List>
      </Paper>
    </ClickAwayListener>
  );

  return (
    <div className={classes.root}>
      <SearchIcon />
      <InputBase
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
      {results.length > 0 && SearchResults}
    </div>
  );
});


export default SearchBar;

