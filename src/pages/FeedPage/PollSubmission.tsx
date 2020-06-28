import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import {
  Button, Card, CardMedia, ClickAwayListener, Divider
} from '@material-ui/core';
import { User } from 'which-types';
import PollSubmissionImage from './PollSubmissionImage';
import UserStrip from '../../components/UserStrip/UserStrip';
import { post } from '../../requests';
import { Contents } from './types';


interface PropTypes{
  user: User;
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

const PollSubmission: React.FC<PropTypes> = ({ user }) => {
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
      post('/polls/', { authorId: user._id, contents }).then(res => {
        console.log(res.data);
      });
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
            <PollSubmissionImage which="left" setContents={setContents} />
            <PollSubmissionImage which="right" setContents={setContents} />
          </CardMedia>
        </Collapse>
        <Button onClick={handleClick} color="primary" variant="outlined" className={classes.button}>
          {
          expanded === false
            ? 'Create a Poll'
            : 'Submit'
        }
        </Button>
      </Card>
    </ClickAwayListener>
  );
};

export default PollSubmission;
