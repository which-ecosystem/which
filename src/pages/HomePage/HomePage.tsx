import React, { useState } from 'react';
import { Typography, Divider, Grid, Button } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from '../../hooks/useNavigate';

const useStyles = makeStyles(theme => ({
  logo: {
    width: theme.spacing(32),
    height: theme.spacing(32)
  },
  leftColumn: {
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold'
  }
}));

const HomePage: React.FC = () => {
  const classes = useStyles();
  const { navigate } = useNavigate();

  const handleLetsGo = () => {
    navigate('feed');
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={4} className={classes.leftColumn}>
        <img src={process.env.PUBLIC_URL + '/which-logo-512.png'} alt="logo" className={classes.logo}/>
      </Grid>
      <Grid item xs={5}>
        <Grid container direction="column" spacing={6}>
          <Grid item>
            <Typography variant="h4"> Which one to choose? </Typography>
            <Divider />
            <Typography>
              <p>Have you ever found yourself stuck between two options, not being able to choose any? This is exactly the problem we are going to solve!</p>
              <p>Share your minor everyday uncertainties with the whole world and see what others think!</p>
              <Button variant="contained" color="primary" size="large" onClick={handleLetsGo}>
                let's go! 
              </Button>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4"> About the project </Typography>
            <Divider />
            <p>
              Visit our <a href="https://github.com/">GitHub</a>
            </p>
          </Grid>
          <Grid item>
            <Typography variant="h4"> Leave feedback </Typography>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;

