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

const Registration: React.FC = () => {
  const errorOutputs = {
    usernameError: 'Username is required',
    emailError: 'Incorrect email',
    passwordError: 'Should be at least 6 characters'
  };
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorUsername, setErrorUsername] = useState<boolean>(false);

  const classes = useStyles();
  const usernameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = () => {
    const username = usernameRef.current?.value?.toLowerCase();
    const password = passwordRef.current?.value;
    const email = emailRef.current?.value;
    if (username && password) {
      post('/users', { username, password, email })
        .then(() => login(username, password))
        .then(() => history.push(`/profile/${username}`));
    }
  };

  const handleLogin = () => {
    history.push('/login');
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorUsername(e.currentTarget.value.length === 0);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorEmail(!e.currentTarget.value.includes('@'));
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorPassword(e.currentTarget.value.length < 6);
  };

  return (
    <>
      <div className={classes.formHeader}>Sign Up</div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          inputRef={usernameRef}
          label="Username"
          error={errorUsername}
          helperText={errorUsername && errorOutputs.usernameError}
          required
          onChange={handleLoginChange}
        />
        <TextField
          inputRef={emailRef}
          label="Email"
          error={errorEmail}
          helperText={errorEmail && errorOutputs.emailError}
          onChange={handleEmailChange}
        />
        <TextField
          inputRef={passwordRef}
          label="Password"
          type="password"
          required
          error={errorPassword}
          helperText={errorPassword && errorOutputs.passwordError}
          onChange={handlePasswordChange}
        />
        <Button variant="contained" onClick={handleSubmit}>submit</Button>
      </form>
      <div className={classes.formTransfer}>
        <div>Already have an account?</div>
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

export default Registration;
