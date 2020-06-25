import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LikeIcon from '@material-ui/icons/Favorite';

interface PropTypes {
  value: number;
  which: 'left' | 'right';
  like: boolean;
}

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    color: 'white',
    top: '86%',
    fontSize: 20,
    textShadow: '0 0 3px black',
    display: 'flex',
    alignItems: 'center'
  },
  left: {
    left: 30
  },
  right: {
    right: 30
  }
});

const PercentageBar: React.FC<PropTypes> = ({ value, which, like }) => {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${classes[which]}`}>
      {like && <LikeIcon />}
      {`${value}%`}
    </div>
  );
};


export default PercentageBar;

