import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { useSnackbar } from 'notistack';
import { useFeedback } from '../../hooks/APIClient';

import { post } from '../../requests';


interface PropTypes {
  version: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    margin: theme.spacing(2, 0)
  }
}));

const ReviewForm: React.FC<PropTypes> = ({ version }) => {
  const [contents, setContents] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const { mutate: updateFeedbacks } = useFeedback();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (): void => {
    if (score) {
      post('/feedback', { contents, score, version }).then(() => {
        enqueueSnackbar('Your feedback has been submitted!', {
          variant: 'success'
        });
        updateFeedbacks();
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setContents(event.target?.value || '');
  };

  const handleChangeRating = (event: React.ChangeEvent<Record<string, unknown>>, newScore: number | null): void => {
    setScore(newScore || 0);
  };

  return (
    <div className={classes.root}>
      <Rating value={score} onChange={handleChangeRating} size="large" />
      <TextField
        value={contents}
        onChange={handleChange}
        label="Feedback"
        variant="outlined"
        className={classes.textField}
        rows={4}
        multiline
      />
      <div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
        >
          submit
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;
