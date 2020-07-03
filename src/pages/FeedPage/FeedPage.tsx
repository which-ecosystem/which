import React, { useState, useEffect } from 'react';
import { Poll } from 'which-types';
import { makeStyles } from '@material-ui/core/styles';

import Feed from '../../components/Feed/Feed';
import { get } from '../../requests';
import PollSubmission from './PollSubmission';
import { useAuth } from '../../hooks/useAuth';


const useStyles = makeStyles(theme => ({
  root: {
    width: theme.spacing(75),
    margin: '0 auto'
  }
}));

const FeedPage: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const { isAuthenticated } = useAuth();
  const classes = useStyles();

  useEffect(() => {
    get('/feed').then(response => {
      setPolls(response.data);
    });
  }, []);

  const addPoll = (poll: Poll): void => {
    polls.unshift(poll);
    setPolls([]);
    setPolls(polls);
  };

  return (
    <div className={classes.root}>
      {isAuthenticated() && <PollSubmission addPoll={addPoll} />}
      <Feed polls={polls} />
    </div>
  );
};

export default FeedPage;

