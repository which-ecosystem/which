import React, { useState } from 'react';
import { Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
});

const HomePage: React.FC = () => {
  const classes = useStyles();

  return (
    <>
  <Typography variant="h3"> Which one to choose? </Typography>

    </>
  );
};

export default HomePage;

