import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardMedia,
  Avatar,
  CardHeader
} from '@material-ui/core/';

interface ImageData {
  url: string;
  votes: number;
}

interface PropTypes {
  author: {
    name: string;
    avatarUrl: string;
  };
  contents: {
    left: ImageData;
    right: ImageData;
  };
}

interface PercentageBarPropTypes {
  value: number;
  which: 'left' | 'right';
}


const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    height: 500,
    margin: '20px auto'
  },
  images: {
    height: 400,
    width: 300
  },
  imagesBlock: {
    display: 'flex'
  },
  percentage: {
    position: 'absolute',
    color: 'white',
    top: '86%',
    fontSize: 20
  },
  percentageLeft: {
    left: 30
  },
  percentageRight: {
    right: 30
  }
});


const PercentageBar: React.FC<PercentageBarPropTypes> = ({ value, which }) => {
  const classes = useStyles();
  const positionClassName = which === 'left' ? 'percentageLeft' : 'percentageRight';

  return (
    <div className={`${classes.percentage} ${classes[positionClassName]}`}>
      {value}
      %
    </div>
  );
};


const PollCard: React.FC<PropTypes> = ({ author, contents: { left, right } }) => {
  const classes = useStyles();

  const leftPercentage = Math.round(100 * (left.votes / (left.votes + right.votes)));
  const rightPercentage = 100 - leftPercentage;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={(
          <Avatar aria-label="avatar">
            <img src={author.avatarUrl} alt={author.name[0].toUpperCase()} />
          </Avatar>
        )}
        title={author.name}
      />
      <div className={classes.imagesBlock}>
        <CardActionArea>
          <CardMedia
            className={classes.images}
            image={left.url}
          />
          <PercentageBar value={leftPercentage} which="left" />
        </CardActionArea>
        <CardActionArea>
          <CardMedia
            className={classes.images}
            image={right.url}
          />
          <PercentageBar value={rightPercentage} which="right" />
        </CardActionArea>
      </div>
    </Card>
  );
};
export default PollCard;

