import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, Typography } from '@material-ui/core/';
import { Which, Poll } from 'which-types';
import { useSnackbar } from 'notistack';

import PercentageBar from './PercentageBar';
import UserStrip from '../UserStrip/UserStrip';
import DateString from '../DateString/DateString';
import BackgroundImage from '../Image/BackgroundImage';
import { post } from '../../requests';
import { useAuth } from '../../hooks/useAuth';

interface PropTypes {
  poll: Poll;
  setPoll: (poll: Poll) => void;
}

const useStyles = makeStyles(theme => ({
  media: {
    display: 'flex',
    height: theme.spacing(50)
  },
  rateLine: {
    position: 'relative',
    width: '100%',
    height: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
    transitionDuration: '0.5s'
  },
  highlight: {
    backgroundColor: `${theme.palette.primary.main} !important`
  },
  fillRateLine: {
    height: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
    transitionDuration: '0.5s'
  },
  description: {
    padding: theme.spacing(1, 2),
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap'
  }
}));

const PollCard: React.FC<PropTypes> = React.memo(({ poll, setPoll }) => {
  const classes = useStyles();
  const { author, contents: { left, right }, vote } = poll;
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated } = useAuth();

  const handleVote = (which: Which) => () => {
    if (!isAuthenticated) {
      enqueueSnackbar('Unauthorized users can not vote in polls', {
        variant: 'error'
      });
    } else if (vote) {
      enqueueSnackbar('You have already voted in this poll', {
        variant: 'error'
      });
    } else {
      const newVote = ({ which, pollId: poll._id });
      const newPoll = { ...poll };
      newPoll.contents[which].votes += 1;
      newPoll.vote = {
        _id: '',
        authorId: '',
        createdAt: new Date(),
        ...newVote
      };
      setPoll(newPoll);

      post('votes/', newVote);
    }
  };

  let leftPercentage;
  let rightPercentage;

  if (left.votes || right.votes) {
    leftPercentage = Math.round(100 * (left.votes / (left.votes + right.votes)));
    rightPercentage = 100 - leftPercentage;
  } else {
    leftPercentage = 0;
    rightPercentage = 0;
  }

  const dominant: Which = left.votes >= right.votes ? 'left' : 'right';

  return (
    <Card elevation={3}>
      <UserStrip user={author} info={<DateString value={poll.createdAt} />} />
      {poll.description && (
        <Typography className={classes.description}>
          {poll.description}
        </Typography>
      )}
      <div className={classes.media}>
        <CardActionArea onDoubleClick={handleVote('left')} className={classes.media}>
          <BackgroundImage src={left.url} />
          <PercentageBar value={leftPercentage} which="left" like={vote?.which === 'left'} />
        </CardActionArea>
        <CardActionArea onDoubleClick={handleVote('right')} className={classes.media}>
          <BackgroundImage src={right.url} />
          <PercentageBar value={rightPercentage} which="right" like={vote?.which === 'right'} />
        </CardActionArea>
      </div>
      <div className={`${classes.rateLine} ${dominant === 'right' ? classes.highlight : ''}`}>
        <div
          className={`${classes.fillRateLine} ${dominant === 'left' ? classes.highlight : ''}`}
          style={{ width: `${leftPercentage}%` }}
        />
      </div>
    </Card>
  );
});

export default PollCard;
