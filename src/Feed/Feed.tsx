import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Poll } from '../types';
import PollCard from '../PollCard/PollCard';

interface PropTypes {
  polls: Poll[],
}

const usedStyles = makeStyles(theme => ({
  feed: {
    position:'relative',
    maxWidth: theme.spacing(75),
    margin: '0 auto'
  }
}));

const Feed: React.FC<PropTypes> = ({ polls }) => {
  const classes = usedStyles();

  return (
    <div className={classes.feed}>
      {
        polls.map(poll => <PollCard poll={poll} />)
      }
    </div>
  );
};

export default Feed;
