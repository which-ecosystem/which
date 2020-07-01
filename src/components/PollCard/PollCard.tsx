import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardMedia
} from '@material-ui/core/';
import { Which, Poll } from 'which-types';
import { useSnackbar } from 'notistack';
import PercentageBar from './PercentageBar';
import UserStrip from '../UserStrip/UserStrip';
import { post } from '../../requests';

interface PropTypes {
  initialPoll: Poll;
}

const DATE_FORMAT = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
};

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: theme.spacing(75),
    height: 488,
    margin: '40px auto'
  },
  images: {
    height: theme.spacing(50),
    width: 300
  },
  imagesBlock: {
    display: 'flex'
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
  }
}));

const PollCard: React.FC<PropTypes> = ({ initialPoll }) => {
  const [poll, setPoll] = useState<Poll>(initialPoll);
  const classes = useStyles();
  const { author, contents: { left, right }, vote } = poll;
  const { enqueueSnackbar } = useSnackbar();
  const date: string = new Date(poll.createdAt).toLocaleString('default', DATE_FORMAT);


  const showSnackBar = (message: string) => {
    enqueueSnackbar(message, {
      variant: 'error'
    });
  };

  const handleVote = (which: Which) => {
    if (vote) {
      showSnackBar('You have already voted');
      return;
    }
    post('votes/', { which, pollId: poll._id }).then(response => {
      poll.contents[which].votes += 1;
      poll.vote = response.data;
      setPoll({ ...poll });
    });
  };

  const handleLeft = () => handleVote('left');
  const handleRight = () => handleVote('right');

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
    <Card className={classes.root}>
      <UserStrip user={author} info={date} />
      <div className={classes.imagesBlock}>
        <CardActionArea onDoubleClick={handleLeft}>
          <CardMedia
            className={classes.images}
            image={left.url}
          />
          <PercentageBar value={leftPercentage} which="left" like={vote?.which === 'left'} />
        </CardActionArea>
        <CardActionArea onDoubleClick={handleRight}>
          <CardMedia
            className={classes.images}
            image={right.url}
          />
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
};

export default PollCard;
