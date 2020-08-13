import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  Divider,
  Container
} from '@material-ui/core';
import { Poll } from 'which-types';
import { useSnackbar } from 'notistack';
import axios from 'axios';

import PollCreationImage from './PollCreationImage';
import UserStrip from '../../components/UserStrip/UserStrip';
import { get, post } from '../../requests';
import { useAuth } from '../../hooks/useAuth';

interface PropTypes{
  addPoll: (poll: Poll) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4)
  },
  images: {
    height: theme.spacing(50),
    display: 'flex'
  }
}));

const PollCreation: React.FC<PropTypes> = ({ addPoll }) => {
  const classes = useStyles();
  const [left, setLeft] = useState<File>();
  const [right, setRight] = useState<File>();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  const readyToSubmit = left && right;

  const uploadImage = (file?: File) => {
    const headers = { 'Content-Type': 'image/png' };
    return get('/files')
      .then(response => response.data)
      .then(uploadUrl => axios.put(uploadUrl, file, { headers }))
      .then(response => {
        const { config: { url } } = response;
        return url && url.slice(0, url.indexOf('.png') + 4);
      });
  };

  const handleClick = async () => {
    if (readyToSubmit) {
      const [leftUrl, rightUrl] = await Promise.all([uploadImage(left), uploadImage(right)]);

      const contents = {
        left: { url: leftUrl },
        right: { url: rightUrl }
      };

      post('/polls/', { contents }).then(response => {
        addPoll(response.data);
        enqueueSnackbar('Your poll has been successfully created!', {
          variant: 'success'
        });
      });
    }
  };

  return (
    <Container maxWidth="sm" disableGutters>
      <Card className={classes.root}>
        {user && <UserStrip user={user} info="" />}
        <Divider />
        <div className={classes.images}>
          <PollCreationImage file={left} setFile={setLeft} />
          <PollCreationImage file={right} setFile={setRight} />
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
