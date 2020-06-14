import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Poll } from '../../types';
import PollCard from '../PollCard/PollCard';

interface PropTypes {
  polls: Poll[];
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: theme.spacing(75),
    margin: '0 auto'
  }
}));

const Feed: React.FC<PropTypes> = ({ polls }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {polls.map(poll => <PollCard poll={poll} key={poll._id} />)}
    </div>
  );
};

export default Feed;

