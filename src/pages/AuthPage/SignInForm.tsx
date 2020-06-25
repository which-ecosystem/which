import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  FormControlLabel,
  Switch
} from '@material-ui/core';

interface PropTypes {
  logIn: (name: string, password: string, remember?: boolean) => Promise<boolean>;
}

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(35)
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  formHeader: {
    textAlign: 'center',
    fontSize: 25
  }
}));

const SignInForm: React.FC<PropTypes> = ({ logIn }) => {
  const [error, setError] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(true);
  const classes = useStyles();
  const nameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const handleCheck = () => {
    setRemember(!remember);
  };

  const handleSubmit = async () => {
    const name = nameRef.current?.value;
    const password = passwordRef.current?.value;
    if (name && password) {
      logIn(name, password, remember).then(success => {
        if (!success) setError(true);
      });
    }
  };

  return (
    <>
      <div className={classes.formHeader}>Sign In</div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          inputRef={nameRef}
          error={error}
          label="Login"
        />
        <TextField
          inputRef={passwordRef}
          error={error}
          helperText={error && 'Invalid credentials'}
          label="Password"
          type="password"
        />
        <FormControlLabel
          control={<Switch color="primary" onClick={handleCheck} checked={remember} size="small" />}
          label="Remember me"
        />
        <Button variant="contained" onClick={handleSubmit}>submit</Button>
      </form>
    </>
  );
};

export default SignInForm;

