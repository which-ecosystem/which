import React, { useState } from 'react';
import { Typography, Divider, Grid, Button, Link } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

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
            <Typography>
              <p>
                The project is written in <Link href="https://www.typescriptlang.org/">
                  Typescript
                </Link> and features <Link href="https://reactjs.org/">
                  React
                </Link>, <Link href="https://feathersjs.com/">
                  Feathers
                </Link>, and <Link href="https://material-ui.com/">
                  Material-UI
                </Link>.
               It is currently open-source and you can visit our <Link href="https://github.com/which-ecosystem">
                GitHub</Link> (make sure to star our repositories)!
              </p>
              <p>
                We encourage any developer to check it out. Feel free to open issues and create Pull Requests!
              </p>
              <p>
                All the development process is being tracked on the KanBan board (thanks GitHub).
                You can always check it to see what is the current state of the project.
              </p>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<TrendingUpIcon />}
                href="https://github.com/orgs/which-ecosystem/projects/1"
              >
                 track our progress
              </Button>
            </Typography>
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

