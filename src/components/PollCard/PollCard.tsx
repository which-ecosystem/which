import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardMedia,
  Avatar,
  CardHeader
} from '@material-ui/core/';
import { Poll } from '../../types';
import PercentageBar from './PercentageBar';

interface PropTypes {
  poll: Poll;
  navigate: (prefix: string, id: string) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: theme.spacing(75),
    height: theme.spacing(63),
    margin: '20px auto'
  },
  images: {
    height: theme.spacing(50),
    width: theme.spacing(38)
  },
  imagesBlock: {
    display: 'flex'
  }
}));


const PollCard: React.FC<PropTypes> = ({ poll, navigate }) => {
  const classes = useStyles();
  const { author, contents } = poll;

  const handleNavigate = () => {
    navigate('profile', poll.author._id);
  };

  const leftPercentage = Math.round(100 * (contents.left.votes / (contents.left.votes + contents.right.votes)));
  const rightPercentage = 100 - leftPercentage;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={(
          <Avatar
            aria-label="avatar"
            src={author.avatarUrl}
            alt={author.name[0].toUpperCase()}
            onClick={handleNavigate}
          />
        )}
        title={author.name}
      />
      <div className={classes.imagesBlock}>
        <CardActionArea>
          <CardMedia
            className={classes.images}
            image={contents.left.url}
          />
          <PercentageBar value={leftPercentage} which="left" />
        </CardActionArea>
        <CardActionArea>
          <CardMedia
            className={classes.images}
            image={contents.right.url}
          />
          <PercentageBar value={rightPercentage} which="right" />
        </CardActionArea>
      </div>
    </Card>
  );
};


export default PollCard;

