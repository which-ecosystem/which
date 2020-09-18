import React, { ChangeEvent, useState } from 'react';
import Bluebird from 'bluebird';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  Divider,
  Container,
  LinearProgress, TextField
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
  },
  textarea: {
    width: '100%',
    height: 100
  },
  descriptionText: {
    padding: 10
  }
}));


const PollCreation: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
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

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleClick = async () => {
    try {
      const [leftUrl, rightUrl] = await Bluebird.all([resolveLeft(), resolveRight()]);
      const contents = {
        left: { url: leftUrl },
        right: { url: rightUrl }
      };
      history.push('/feed');

      post('/polls/', { contents, description }).then(() => {
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
        <TextField
          multiline
          rows={2}
          placeholder="Add a description"
          fullWidth
          InputProps={{
            className: classes.descriptionText
          }}
          onChange={handleDescriptionChange}
        />
        <div className={classes.images}>
          <ImageInput callback={setLeft} progress={leftProgress} />
          <ImageInput callback={setRight} progress={rightProgress} />
        </div>
        {
          leftProgress || rightProgress
            ? <LinearProgress color="primary" />
            : (
              <Button
                color="primary"
                disabled={!(left && right)}
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
