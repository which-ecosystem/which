import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Divider,
  Grid,
  Button,
  Link,
  useMediaQuery
} from '@material-ui/core/';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { Rating } from '@material-ui/lab';
import { Feedback } from 'which-types';

import { useAuth } from '../../hooks/useAuth';
import { useFeedback } from '../../hooks/APIClient';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import ReviewForm from './ReviewForm';

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    padding: theme.spacing(0, 2)
  },
  logo: {
    width: theme.spacing(20),
    height: theme.spacing(20)
  },
  score: {
    fontWeight: 'bold'
  },
  signup: {
    marginLeft: theme.spacing(2)
  },
  reviews: {
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 10)
    }
  }
}));

const Home: React.FC = () => {
  const { data: feedbacks } = useFeedback();
  const classes = useStyles();
  const history = useHistory();
  const { isAuthenticated, user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const rating = feedbacks.length && feedbacks.reduce(
    (acc: number, feedback: Feedback) => acc + feedback.score,
    0
  ) / feedbacks.length;

  const handleLetsGo = () => {
    history.push('/feed');
  };

  const handleSignUp = () => {
    history.push('/registration');
  };

  const GithubLink = <Link href="https://github.com/which-ecosystem">GitHub</Link>;
  const TypescriptLink = <Link href="https://www.typescriptlang.org/">Typescript</Link>;
  const ReactLink = <Link href="https://reactjs.org/">React</Link>;
  const FeathersLink = <Link href="https://feathersjs.com">Feathers</Link>;
  const MUILink = <Link href="https://material-ui.com">Material-UI</Link>;
  const EmailLink = <Link href="mailto: eug-vs@keemail.me">eug-vs@keemail.me</Link>;

  const Reviews = (
    <div className={classes.reviews}>
      {feedbacks.map((feedback: Feedback) => <ReviewCard feedback={feedback} />)}
    </div>
  );

  const FeedbackSection = feedbacks.findIndex((feedback: Feedback) => feedback.author._id === user?._id) >= 0 ? (
    <p>
      You have already left feedback for this version.
      If you have more to say, please open GitHub issue or contact us directly via email: {EmailLink}.
      Alternatively, you can just wait for another application patch to come out.
    </p>
  ) : (
    <>
      <p>
        Here you can share your thougts about Which with us!
        Note that you can ony leave feedback once per application version (there will be plenty of them later).
      </p>
      {isAuthenticated ? <ReviewForm /> : (
        <>
          <p> You must be authorized to leave feedback.</p>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSignUp}
          >
            sign in
          </Button>
        </>
      )}
    </>
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Grid container direction="column" spacing={1} alignItems="center">
            <Grid item>
              <img src={`${process.env.PUBLIC_URL}/which-logo-512.png`} alt="logo" className={classes.logo} />
            </Grid>
            <Grid item>
              {rating !== 0 && <Rating value={rating} readOnly size="large" />}
            </Grid>
            <Grid item>
              {rating !== 0 && (
                <Typography variant="h5" className={classes.score}>
                  User score: {rating.toFixed(1)}
                </Typography>
              )}
            </Grid>
          </Grid>
          {isMobile || Reviews}
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
                {!isAuthenticated && (
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
            <Grid item>
              <Typography variant="h4"> Leave feedback </Typography>
              <Divider />
              <Typography>
                {FeedbackSection}
              </Typography>
            </Grid>
            {isMobile && (
              <Grid item>
                {Reviews}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;

