import React, { useState, useEffect } from 'react';
import {
  Typography,
  Divider,
  Grid,
  Button,
  Link
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { Rating } from '@material-ui/lab';
import { Feedback } from 'which-types';

import { useNavigate } from '../../hooks/useNavigate';
import { useAuth } from '../../hooks/useAuth';
import { get } from '../../requests';

const useStyles = makeStyles(theme => ({
  logo: {
    width: theme.spacing(20),
    height: theme.spacing(20)
  },
  score: {
    fontWeight: 'bold'
  },
  signup: {
    marginLeft: theme.spacing(2)
  }
}));

const HomePage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const classes = useStyles();
  const { navigate } = useNavigate();
  const { isAuthenticated } = useAuth();

  const rating = feedbacks.length && feedbacks.reduce(
    (acc: number, feedback: Feedback) => acc + feedback.score,
    0
  ) / feedbacks.length;

  useEffect(() => {
    get('/feedback').then(response => {
      setFeedbacks(response.data);
    });
  }, []);

  const handleLetsGo = () => {
    navigate('feed');
  };

  const handleSignUp = () => {
    navigate('auth');
  };

  const GithubLink = <Link href="https://github.com/which-ecosystem">GitHub</Link>;
  const TypescriptLink = <Link href="https://www.typescriptlang.org/">Typescript</Link>;
  const ReactLink = <Link href="https://reactjs.org/">React</Link>;
  const FeathersLink = <Link href="https://feathersjs.com">Feathers</Link>;
  const MUILink = <Link href="https://material-ui.com">Material-UI</Link>;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Grid container direction="column" spacing={1} alignItems="center">
          <Grid item>
            <img src={`${process.env.PUBLIC_URL}/which-logo-512.png`} alt="logo" className={classes.logo} />
          </Grid>
          <Grid item>
            <Rating value={rating} readOnly size="large" />
          </Grid>
          <Grid item>
            <Typography variant="h5" className={classes.score}>
              User score: {rating.toFixed(1)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={5}>
        <Grid container direction="column" spacing={6}>
          <Grid item>
            <Typography variant="h4"> Which one to choose? </Typography>
            <Divider />
            <Typography>
              <p>
                Have you ever found yourself stuck between two options, not being able to choose any?
                This is exactly the problem we are going to solve!
              </p>
              <p>Share your minor everyday uncertainties with the whole world and see what others think!</p>
              <Button variant="contained" color="primary" size="large" onClick={handleLetsGo}>
                {'let\'s go!'}
              </Button>
              {!isAuthenticated() && (
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  className={classes.signup}
                  onClick={handleSignUp}
                >
                  sign up
                </Button>
              )}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4"> About the project </Typography>
            <Divider />
            <Typography>
              <p>
                The project is written in {TypescriptLink} and features {ReactLink}, {FeathersLink}, and {MUILink}.
                It is currently open-source and you can visit our {GithubLink} (make sure to star our repositories)!
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;

