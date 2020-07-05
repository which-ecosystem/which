import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { useSnackbar } from 'notistack';

import { post } from '../../requests';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from '../../hooks/useNavigate';

const version = 'v1.0.0';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    margin: theme.spacing(2, 0)
  }
}));

const ReviewForm: React.FC = () => {
  const [contents, setContents] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const classes = useStyles();
  const { navigate } = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (): void => {
    if (contents && score) {
      post('/feedback', { contents, score, version }).then(() => {
        enqueueSnackbar('Your feedback has been submitted!', {
          variant: 'success'
        });
        navigate('feed');
      });
    }
  };

  const handleChange = (event: any): void => {
    setContents(event.target?.value || '');
  };

  const handleChangeRating = (event: any, newScore: any): void => {
    setScore(newScore);
  };

  return (
    <div className={classes.root}>
      <Rating value={score} onChange={handleChangeRating} size="large"/>
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
