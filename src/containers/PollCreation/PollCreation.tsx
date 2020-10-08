import React from 'react';
import Bluebird from 'bluebird';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Card,
  Container,
  LinearProgress
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useSnackbar } from 'notistack';

import useS3Preupload from './useS3Preupload';
import ImageInput from './ImageInput';
import ModalScreen from '../../components/ModalScreen/ModalScreen';
import UserStrip from '../../components/UserStrip/UserStrip';
import { post } from '../../requests';
import { useFeed } from '../../hooks/APIClient';
import { useAuth } from '../../hooks/useAuth';


const useStyles = makeStyles(theme => ({
  images: {
    height: theme.spacing(50),
    display: 'flex'
  }
}));


const PollCreation: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: updateFeed } = useFeed();
  const {
    file: left,
    setFile: setLeft,
    resolve: resolveLeft,
    progress: leftProgress
  } = useS3Preupload();
  const {
    file: right,
    setFile: setRight,
    resolve: resolveRight,
    progress: rightProgress
  } = useS3Preupload();

  const handleSubmit = async () => {
    try {
      const [leftUrl, rightUrl] = await Bluebird.all([resolveLeft(), resolveRight()]);

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

  const submitIcon = (
    <IconButton onClick={handleSubmit} disabled={!(left && right)}>
      <SendIcon />
    </IconButton>
  );

  return (
    <ModalScreen title="Create a poll" rightIcon={submitIcon}>
      <Container maxWidth="sm" disableGutters>
        <Card elevation={3}>
          {user && <UserStrip user={user} info="" />}
          <div className={classes.images}>
            <ImageInput callback={setLeft} progress={leftProgress} />
            <ImageInput callback={setRight} progress={rightProgress} />
          </div>
          {(leftProgress > 0 || rightProgress > 0) && <LinearProgress color="primary" />}
        </Card>
      </Container>
    </ModalScreen>
  );
};

export default PollCreation;
