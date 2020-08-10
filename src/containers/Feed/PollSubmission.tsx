import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import {
  Button,
  Card,
  ClickAwayListener,
  Divider
} from '@material-ui/core';
import { Poll } from 'which-types';
import { useSnackbar } from 'notistack';
import axios from 'axios';

import PollSubmissionImage from './PollSubmissionImage';
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

const PollSubmission: React.FC<PropTypes> = ({ addPoll }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [left, setLeft] = useState<File>();
  const [right, setRight] = useState<File>();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  const readyToSubmit = left && right;

  const handleClickAway = () => {
    setExpanded(false);
  };

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
    if (expanded && readyToSubmit) {
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
    setExpanded(!expanded);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Card className={classes.root}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {user && <UserStrip user={user} info="" />}
          <Divider />
          <div className={classes.images}>
            <PollSubmissionImage file={left} setFile={setLeft} />
            <PollSubmissionImage file={right} setFile={setRight} />
          </div>
        </Collapse>
        <Button
          color="primary"
          disabled={expanded && !readyToSubmit}
          variant={expanded ? 'contained' : 'outlined'}
          onClick={handleClick}
          fullWidth
        >
          {expanded ? 'Submit' : 'Create a Poll'}
        </Button>
      </Card>
    </ClickAwayListener>
  );
};

export default PollSubmission;
