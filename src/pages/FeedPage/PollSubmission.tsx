import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import {
  Button,
  Card,
  ClickAwayListener,
  Divider
} from '@material-ui/core';
import { User, Poll } from 'which-types';
import PollSubmissionImage from './PollSubmissionImage';
import UserStrip from '../../components/UserStrip/UserStrip';
import { post } from '../../requests';
import { Contents } from './types';


interface PropTypes{
  user: User;
  polls: Poll[];
  setPolls: (newPoll: Poll[])=> void;
}
const useStyles = makeStyles(theme => ({
  root: {
    height: theme.spacing(50),
    display: 'flex'
  }
}));

const PollSubmission: React.FC<PropTypes> = ({ user, polls, setPolls }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [contents, setContents] = useState<Contents>({
    left: {
      url: ''
    },
    right: {
      url: ''
    }
  });

  const handleClickAway = () => {
    setExpanded(false);
  };

  const handleClick = () => {
    if (expanded) {
      if (contents.left.url && contents.right.url) {
        post('/polls/', { authorId: user._id, contents }).then(res => {
          polls.unshift({ ...res.data });
          setPolls([...polls]);
        });
      }
    }
    setExpanded(!expanded);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Card>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <UserStrip user={user} info="" navigate={() => {}} />
          <Divider />
          <div className={classes.root}>
            <PollSubmissionImage which="left" setContents={setContents} contents={contents} />
            <PollSubmissionImage which="right" setContents={setContents} contents={contents} />
          </div>
        </Collapse>
        <Button
          color="primary"
          disabled={expanded && !(contents.left.url && contents.right.url)}
          variant={expanded ? "contained" : "outlined"}
          onClick={handleClick}
          fullWidth
        >
          {expanded ? 'Submit' : 'Create a Poll' }
        </Button>
      </Card>
    </ClickAwayListener>
  );
};

export default PollSubmission;
