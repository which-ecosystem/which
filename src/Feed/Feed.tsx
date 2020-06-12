import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Poll } from '../types';
import PollCard from '../PollCard/PollCard';
import { get } from '../requests';

interface PropTypes {
  page: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: theme.spacing(75),
    margin: '0 auto'
  }
}));

const Feed: React.FC<PropTypes> = ({ page }) => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const classes = useStyles();

  let endpoint: string;
  if (page === 'feed') endpoint = '/polls';
  else if (page === 'profiles') endpoint = '/profiles';

  useEffect(() => {
    get(endpoint).then(response => {
      setPolls(response.data);
    });
  }, []);

  return (
    <div className={classes.root}>
      {polls.map(poll => <PollCard poll={poll} />)}
    </div>
  );
};

export default Feed;

