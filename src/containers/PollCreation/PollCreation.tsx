/* eslint-disable */
import React from 'react';
import Bluebird from 'bluebird';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  Divider,
  Container,
  LinearProgress
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

import useS3Preupload from './useS3Preupload';
import ImageInput from './ImageInput';
import UserStrip from '../../components/UserStrip/UserStrip';
import { post } from '../../requests';
import { useAuth } from '../../hooks/useAuth';
import { useFeed } from '../../hooks/APIClient';


const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4)
  },
  images: {
    height: theme.spacing(50),
    display: 'flex'
  }
}));


const PollCreation: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const { mutate: updateFeed } = useFeed();
  const {
    setValue: setLeft,
    progress: progressLeft,
    resolve: resolveLeft,
    isReady: isLeftReady
  } = useS3Preupload();
  const {
    setValue: setRight,
    progress: progressRight,
    resolve: resolveRight,
    isReady: isRightReady
  } = useS3Preupload();

  const handleClick = async () => {
    try {
      const [leftUrl, rightUrl] = await Bluebird.all([resolveLeft(), resolveRight()]);
      console.log('leftUrl', leftUrl);
      console.log('rightUrl', rightUrl);

      const contents = {
        left: { url: leftUrl },
        right: { url: rightUrl }
      };

      history.push('/feed');

      post('/polls/', { contents }).then(() => {
        updateFeed();
        enqueueSnackbar('Your poll has been successfully created!', { variant: 'success' });
      });
    } catch (error) {
      enqueueSnackbar('Failed to create a poll. Please, try again.', { variant: 'error' });
      history.push('/feed');
    }
  };

  return (
    <Container maxWidth="sm" disableGutters>
      <Card className={classes.root}>
        {user && <UserStrip user={user} info="" />}
        <Divider />
        <div className={classes.images}>
          <ImageInput callback={setLeft} progress={progressLeft} />
          <ImageInput callback={setRight} progress={progressRight} />
        </div>
        {
          progressLeft || progressRight
            ? <LinearProgress color="primary" />
            : (
              <Button
                color="primary"
                disabled={!(isLeftReady && isRightReady)}
                variant="contained"
                onClick={handleClick}
                fullWidth
              >
                Submit
              </Button>
            )
        }
      </Card>
    </Container>
  );
};

export default PollCreation;
