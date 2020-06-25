import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardMedia,
  Avatar,
  CardHeader
} from '@material-ui/core/';
import { Which, Poll } from 'which-types';

import PercentageBar from './PercentageBar';
import { post } from '../../requests';

interface PropTypes {
  initialPoll: Poll;
  navigate: (prefix: string, id: string) => void;
}

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
  avatar: {
    cursor: 'pointer'
  },
  rateLine: {
    position: 'relative',
    width: '100%',
    height: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
    transitionDuration: '0.5s'
  },
  highlight: {
    backgroundColor: theme.palette.primary.main + ' !important'
  },
  fillRateLine: {
    height: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
    transitionDuration: '0.5s'
  }
}));

const PollCard: React.FC<PropTypes> = ({ initialPoll, navigate }) => {
  const [poll, setPoll] = useState<Poll>(initialPoll);
  const classes = useStyles();
  const { author, contents: { left, right }, userChoice } = poll;

  const handleNavigate = () => {
    navigate('profile', poll.author._id);
  };

  const vote = (which: Which) => {
    if (userChoice) return;
    post('votes/', { which, pollId: poll._id }).then(() => {
      poll.contents[which].votes += 1;
      poll.userChoice = which;
      setPoll({ ...poll });
    });
  };

  const handleLeft = () => vote('left');
  const handleRight = () => vote('right');

  const leftPercentage = Math.round(100 * (left.votes / (left.votes + right.votes)));
  const rightPercentage = 100 - leftPercentage

  const dominant: Which = left.votes >= right.votes ? 'left' : 'right';

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={(
          <Avatar
            aria-label="avatar"
            src={author.avatarUrl}
            alt={author.username[0].toUpperCase()}
            onClick={handleNavigate}
            className={classes.avatar}
          />
        )}
        title={author.username}
      />
      <div className={classes.imagesBlock}>
        <CardActionArea onDoubleClick={handleLeft}>
          <CardMedia
            className={classes.images}
            image={left.url}
          />
          <PercentageBar value={leftPercentage} which="left" like={userChoice === 'left'} />
        </CardActionArea>
        <CardActionArea onDoubleClick={handleRight}>
          <CardMedia
            className={classes.images}
            image={right.url}
          />
          <PercentageBar value={rightPercentage} which="right" like={userChoice === 'right'} />
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
