import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import {
  Button, Card, CardMedia, ClickAwayListener, Divider
} from '@material-ui/core';
import { User, Poll } from 'which-types';
import PollSubmissionImage from './PollSubmissionImage';
import UserStrip from '../../components/UserStrip/UserStrip';
import { post } from '../../requests';
import { Contents } from './types';


interface PropTypes{
  user: User;
  polls: Poll[];
  setPolls: (a:Poll[])=> void;
}
const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    cursor: 'pointer'
  },
  card: {
    height: 400,
    display: 'flex'
  },
  images: {
    height: theme.spacing(50),
    width: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  button: {
    width: '100%'
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
      <Card className={classes.root}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <UserStrip user={user} info="" navigate={() => {}} />
          <Divider />
          <CardMedia className={classes.card}>
            <PollSubmissionImage which="left" setContents={setContents} contents={contents} />
            <PollSubmissionImage which="right" setContents={setContents} contents={contents} />
          </CardMedia>
        </Collapse>
        <Button onClick={handleClick} color="primary" variant="outlined" className={classes.button}>
          {
          !expanded
            ? 'Create a Poll'
            : 'Submit'
        }
        </Button>
      </Card>
    </ClickAwayListener>
  );
};

export default PollSubmission;
