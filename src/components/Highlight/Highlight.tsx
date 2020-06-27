import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';

interface PropTypes {
  text: string;
  value: any;
}

const useStyles = makeStyles({
  root: {
    position: 'relative'
  },
  menuButton: {
    width: 200,
    height: 50,
    textAlign: 'center',
  },
  menuNumber: {
    fontWeight: 800,
    color: 'black'
  },
  menuText: {
    color: 'darkgray'
  },
});


const Highlight: React.FC<PropTypes> = ({text, value}) => {
  const classes = useStyles();

  return (
    <div className={classes.menuButton}>
      <div className={classes.menuNumber}>{value}</div>
      <div className={classes.menuText}>{text}</div>
    </div>
  );
};

export default Highlight;
