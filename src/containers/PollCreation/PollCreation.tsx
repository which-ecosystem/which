import React, { ChangeEvent, useState, useMemo } from 'react';
import Bluebird from 'bluebird';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Container, LinearProgress, InputBase, Typography } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useSnackbar } from 'notistack';

import useS3Preupload from './useS3Preupload';
import ImageInput from './ImageInput';
import ModalScreen from '../../components/ModalScreen/ModalScreen';
import Message from '../../components/Message/Message';
import UserStrip from '../../components/UserStrip/UserStrip';
import { post } from '../../requests';
import { useFeed, useProfile } from '../../hooks/APIClient';
import { useAuth } from '../../hooks/useAuth';

const useStyles = makeStyles(theme => ({
  images: {
    height: theme.spacing(50),
    display: 'flex'
  },
  textarea: {
    width: '100%',
    height: 100
  },
  description: {
    fontSize: 14,
    padding: theme.spacing(1, 2)
  }
}));

const PollCreation: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const { mutate: updateFeed } = useFeed();
  const { mutate: updateProfile } = useProfile(user?.username || '');
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

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const [leftUrl, rightUrl] = await Bluebird.all([resolveLeft(), resolveRight()]);
      const contents = {
        left: { url: leftUrl },
        right: { url: rightUrl }
      };

      post('/polls/', { contents, description }).then(() => {
        updateFeed();
        updateProfile();
        enqueueSnackbar('Your poll has been successfully created!', { variant: 'success' });
      });
    } catch (error) {
      enqueueSnackbar('Failed to create a poll. Please, try again.', { variant: 'error' });
    }
  };

  const isSubmitting = useMemo(() => leftProgress + rightProgress > 0, [leftProgress, rightProgress]);

  return (
    <ModalScreen
      title="Create a poll"
      actionIcon={<SendIcon />}
      handleAction={handleSubmit}
      isActionDisabled={!(left && right) || isSubmitting}
    >
      <Container maxWidth="sm" disableGutters>
        <Card elevation={3}>
          {user && <UserStrip user={user} />}
          <Typography component='span'>
            <InputBase
              multiline
              fullWidth
              placeholder="Add description"
              onChange={handleDescriptionChange}
              className={classes.description}
              readOnly={isSubmitting}
            />
          </Typography>
          <div className={classes.images}>
            <ImageInput callback={setLeft} progress={leftProgress} />
            <ImageInput callback={setRight} progress={rightProgress} />
          </div>
        </Card>
        {isSubmitting && (
          <>
            <LinearProgress color="primary" />
            <Message
              tagline="You can close this window now"
              message="We will upload your images in the background."
              noMargin
            />
          </>
        )}
      </Container>
    </ModalScreen>
  );
};

export default PollCreation;
