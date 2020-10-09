import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Chip
} from '@material-ui/core/';
import { Rating } from '@material-ui/lab';
import { Feedback } from 'which-types';

import UserStrip from '../UserStrip/UserStrip';

interface PropTypes {
  feedback: Feedback;
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4, 0, 1, 0),
    position: 'relative'
  },
  versionChip: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2)
  }
}));

const ReviewCard: React.FC<PropTypes> = ({ feedback }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={2}>
      <UserStrip
        user={feedback.author}
        info={<Rating value={feedback.score} readOnly size="small" />}
      />
      <Chip
        size="small"
        variant="outlined"
        label={feedback.version}
        className={classes.versionChip}
      />
      {feedback.contents && (
        <>
          <Divider />
          <CardContent>
            <Typography>
              {feedback.contents}
            </Typography>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default ReviewCard;
