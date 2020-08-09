import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  loader: {
    width: '100%',
    textAlign: 'center',
    marginTop: theme.spacing(10)
  }
}));

const Loading: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.loader}>
      <CircularProgress color="primary" style={{ margin: '0 auto' }} />
    </div>
  );
};

export default Loading;

