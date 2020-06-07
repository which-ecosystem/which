import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Poll } from '../types';
import PollCard from '../PollCard/PollCard';

interface PropTypes {
  polls: Poll[],
}

const usedStyles = makeStyles(() => ({
  feed: {
    maxWidth: 600,
    margin: '0 auto'
  }
}));

const Feed: React.FC<PropTypes> = ({ polls }) => {
  const classes = usedStyles();

  return (
    <div className={classes.feed}>
      {
        polls.map(poll => <PollCard author={poll.author} contents={poll.contents} />)
      }
    </div>
  );
};

export default Feed;
