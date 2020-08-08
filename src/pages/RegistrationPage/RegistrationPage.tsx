import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { post } from '../../requests';
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

const RegistrationPage: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
  const classes = useStyles();
  const usernameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const email = emailRef.current?.value;
    if (username && password) {
      post('/users', { username, password, email })
        .then(() => login(username, password))
        .then(() => history.push(`/profile/${username}`));
    } else setError(true);
  };

  const handleLogin = () => {
    history.push('/login');
  };

  return (
    <>
      <div className={classes.formHeader}>Sign Up</div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          inputRef={usernameRef}
          label="Username"
          error={error}
          helperText={error && 'This field is required!'}
          required
        />
        <TextField inputRef={emailRef} label="Email" />
        <TextField
          inputRef={passwordRef}
          label="Password"
          type="password"
          required
          error={error}
          helperText={error && 'This field is required!'}
        />
        <Button variant="contained" onClick={handleSubmit}>submit</Button>
      </form>
      <div className={classes.formTransfer}>
        <div>{'Already have an account?'}</div>
        <span
          onClick={handleLogin}
          className={classes.transferButton}
          role="presentation"
        >
          Log in
        </span>
      </div>
    </>
  );
};

export default RegistrationPage;
