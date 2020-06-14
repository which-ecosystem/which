import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface PropTypes {
  value: number;
  which: 'left' | 'right';
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    color: 'white',
    top: '86%',
    fontSize: 20,
    textShadow: '0 0 3px black'
  },
  left: {
    left: 30
  },
  right: {
    right: 30
  }
}));

const PercentageBar: React.FC<PropTypes> = ({ value, which }) => {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${classes[which]}`}>
      {value}
      %
    </div>
  );
};


export default PercentageBar;

