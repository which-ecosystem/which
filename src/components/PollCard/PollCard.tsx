import React, {useState} from 'react';
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
  poll: Poll;
  navigate: (prefix: string, id: string) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: theme.spacing(75),
    height: 488,
    margin: '40px auto',
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
    position:'relative',
    margin: '0 auto',
    width: '100%',
    height: theme.spacing(2),
    backgroundColor: theme.palette.primary.light
  },
  fillRateLine: {
    height: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    transitionDuration: '0.5s'
  },
}));

const PollCard: React.FC<PropTypes> = ({ poll, navigate }) => {
  const classes = useStyles();
  const { author, contents } = poll;
  const [rate, setRate] = useState<{left: number, right: number}>({left: contents.left.votes,right: contents.right.votes});

  const handleNavigate = () => {
    navigate('profile', poll.author._id);
  };

  const vote = (which: Which) => {
    post(`polls/${ poll._id }/votes/`,{ which }).then((response)=>{
      console.log(response.data);
      const leftV = response.data.contents.left.votes;
      const rightV = response.data.contents.right.votes;
      setRate({left: leftV, right: rightV});
    })
      .catch(error => {
      console.log(error.response)
    });
  };

    const leftPercentage = Math.round(100 * (rate.left / (rate.left + rate.right)));
    const rightPercentage = 100 - leftPercentage;

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
        <CardActionArea onDoubleClick={() => vote('left')}>
          <CardMedia
            className={classes.images}
            image={contents.left.url}
          />
          <PercentageBar value={leftPercentage} which="left" />
        </CardActionArea>
        <CardActionArea onDoubleClick={() => vote('right')}>
          <CardMedia
            className={classes.images}
            image={contents.right.url}
          />
          <PercentageBar value={rightPercentage} which="right" />
        </CardActionArea>
      </div>
      <div className={classes.rateLine}>
        <div className={classes.fillRateLine} style={{width: `${leftPercentage}%`}} />
      </div>
    </Card>
  );
};

export default PollCard;
