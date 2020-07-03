import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    textAlign: 'center'
  }
});

const NotificationsPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Typography variant="h4" className={classes.root}>
      Sorry, this page is being constructed yet.
    </Typography>
  );
};

export default NotificationsPage;

