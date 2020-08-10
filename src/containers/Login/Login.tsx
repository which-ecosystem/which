import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { useAuth } from '../../hooks/useAuth';

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
  },
  formTransfer: {
    display: 'flex',
    justifyContent: 'center'
  },
  transferButton: {
    marginLeft: 10,
    color: 'green',
    cursor: 'pointer'
  }
}));

const Login: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(true);
  const classes = useStyles();
  const nameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const { login } = useAuth();
  const history = useHistory();

  const handleCheck = () => {
    setRemember(!remember);
  };

  const handleSubmit = async () => {
    const name = nameRef.current?.value?.toLowerCase();
    const password = passwordRef.current?.value;
    if (name && password) {
      login(name, password, remember).then(success => {
        if (success) history.push(`/profile/${name}`);
        else setError(true);
      });
    }
  };

  const handleRegistration = () => {
    history.push('/registration');
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
      <div className={classes.formTransfer}>
        <div>{'Don\'t have an account?'}</div>
        <span
          onClick={handleRegistration}
          className={classes.transferButton}
          role="presentation"
        >
          Sign up
        </span>
      </div>
    </>
  );
};

export default Login;

