import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import {
  Button,
  Card,
  ClickAwayListener,
  Divider
} from '@material-ui/core';
import { Poll, Which } from 'which-types';
import PollSubmissionImage from './PollSubmissionImage';
import UserStrip from '../../components/UserStrip/UserStrip';
import { post } from '../../requests';
import { Contents } from './types';
import { useAuth } from '../../hooks/useAuth';
import {useSnackbar} from "notistack";

interface PropTypes{
  addPoll: (poll: Poll) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    height: theme.spacing(50),
    display: 'flex'
  }
}));

const emptyContents: Contents = {
  left: { url: '' },
  right: { url: '' }
};

const PollSubmission: React.FC<PropTypes> = ({ addPoll }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [contents, setContents] = useState<Contents>(emptyContents);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { user } = useAuth();

  const readyToSubmit = contents.left.url && contents.right.url;

  const setUrl = (which: Which) => (url: string): void => {
    setContents({ ...contents, [which]: { url } });
  };

  const handleClickAway = () => {
    setExpanded(false);
  };

  const handleClick = () => {
    if (expanded && readyToSubmit) {
      post('/polls/', { contents }).then(response => {
        addPoll(response.data);
        showSnackBar('Your poll has been successfully created!');
      });
      setContents({ ...emptyContents });
    }
    setExpanded(!expanded);
  };

  const showSnackBar = (message: string) => {
    enqueueSnackbar(message, {
      variant: 'success',
    });
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Card>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {user && <UserStrip user={user} info="" />}
          <Divider />
          <div className={classes.root}>
            <PollSubmissionImage url={contents.left.url} setUrl={setUrl('left')} />
            <PollSubmissionImage url={contents.right.url} setUrl={setUrl('right')} />
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
