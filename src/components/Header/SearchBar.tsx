import React, { useState, useEffect } from 'react';
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

interface PropTypes {
  navigate: (prefix: string, id: string) => void;
}

const INTERVAL = 300;

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
  }
}));

const SearchBar: React.FC<PropTypes> = ({ navigate }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<User[]>([]);
  const [isReady, setIsReady] = useState<boolean>(true);
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);
  const classes = useStyles();

  const sleep = () => {
    setIsReady(false);
    setTimeout(() => setIsReady(true), INTERVAL);
  };

  const fetchPolls = () => {
    sleep();
    get(`/users?username[$regex]=${query}`).then(response => {
      setResults(response.data);
    });
  };

  useEffect(() => {
    if (isReady && shouldRefetch) {
      fetchPolls();
      setShouldRefetch(false);
    }
  }, [isReady]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
    if (isReady) fetchPolls();
    else setShouldRefetch(true);
  };

  const handleClose = () => {
    setQuery('');
    setResults([]);
  };

  const handleNavigate = (index: number) => () => {
    navigate('profile', results[index]._id);
    handleClose();
  };

  const SearchResults = (
    <ClickAwayListener onClickAway={handleClose}>
      <Paper className={classes.results}>
        <List>
          {
          results.map((result, index) => (
            <>
              <ListItem button onClick={handleNavigate(index)}>
                <UserStrip user={result} navigate={navigate} />
              </ListItem>
              {(index < results.length - 1) && <Divider />}
            </>
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
};


export default SearchBar;

