import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Poll } from '../../types';
import PollCard from '../PollCard/PollCard';
import { get } from '../../requests';

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

  let endpoint = '/polls';
  // TODO: Make this work
  if (page === 'feed') endpoint = '/polls';

  useEffect(() => {
    get(endpoint).then(response => {
      setPolls(response.data);
    });
  }, [endpoint]);

  return (
    <div className={classes.root}>
      {polls.map(poll => <PollCard poll={poll} key={poll._id} />)}
    </div>
  );
};

export default Feed;

