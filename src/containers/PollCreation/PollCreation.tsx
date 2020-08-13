import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  Divider,
  Container
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import axios from 'axios';

import PollCreationImage from './PollCreationImage';
import UserStrip from '../../components/UserStrip/UserStrip';
import { get, post } from '../../requests';
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
  const [left, setLeft] = useState<File | string>();
  const [right, setRight] = useState<File | string>();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const { mutate: updateFeed } = useFeed();

  const readyToSubmit = left && right;

  const uploadFile = (file: File): Promise<string> => {
    const headers = { 'Content-Type': 'image/png' };
    return get('/files')
      .then(response => response.data)
      .then(uploadUrl => axios.put(uploadUrl, file, { headers }))
      .then(response => {
        const { config: { url } } = response;
        return url?.slice(0, url?.indexOf('?')) || '';
      });
  };

  const resolveFile = async (file?: File | string): Promise<string> => {
    if (file instanceof File) return uploadFile(file);
    return file || '';
  };

  const handleClick = async () => {
    if (readyToSubmit) {
      const [leftUrl, rightUrl] = await Promise.all([resolveFile(left), resolveFile(right)]);

      const contents = {
        left: { url: leftUrl },
        right: { url: rightUrl }
      };

      post('/polls/', { contents }).then(response => {
        updateFeed();
        enqueueSnackbar('Your poll has been successfully created!', {
          variant: 'success'
        });
      });

      history.push('/feed');
    }
  };

  return (
    <Container maxWidth="sm" disableGutters>
      <Card className={classes.root}>
        {user && <UserStrip user={user} info="" />}
        <Divider />
        <div className={classes.images}>
          <PollCreationImage callback={setLeft} />
          <PollCreationImage callback={setRight} />
        </div>
        <Button
          color="primary"
          disabled={!readyToSubmit}
          variant="contained"
          onClick={handleClick}
          fullWidth
        >
          Submit
        </Button>
      </Card>
    </Container>
  );
};

export default PollCreation;
