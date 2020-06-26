import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    position: 'relative'
  },
  status: {
    textAlign: 'center',
    color: 'darkgray'
  },
});


const UserStatus: React.FC = () => {
  const classes = useStyles();

  const changeStatus = () => {

  };

  return (
    <div className={classes.status} onClick={changeStatus}>
      I am not alcoholic
    </div>
  );
};

export default UserStatus;
