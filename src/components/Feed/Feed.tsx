import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Poll } from 'which-types';
import PollCard from '../PollCard/PollCard';

interface PropTypes {
  polls: Poll[];
  navigate: (prefix: string, id: string) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: theme.spacing(75),
    margin: '0 auto'
  }
}));

const Feed: React.FC<PropTypes> = ({ polls, navigate }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {polls.map(poll => <PollCard poll={poll} key={poll._id} navigate={navigate} />)}
    </div>
  );
};

export default Feed;

