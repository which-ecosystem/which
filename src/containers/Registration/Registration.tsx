import React, {useState, useRef, FormEvent} from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import { CheckCircle, Visibility, VisibilityOff } from '@material-ui/icons';
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

interface ValidationStates {
  validUsername: boolean | undefined;
  validEmail: boolean | undefined;
  validPassword: boolean | undefined;
  showPassword: boolean;
}

const Registration: React.FC = () => {
  const [values, setValues] = useState<ValidationStates>({
    validUsername: undefined,
    validEmail: undefined,
    validPassword: undefined,
    showPassword: false
  });

  const classes = useStyles();
  const usernameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const { login } = useAuth();
  const history = useHistory();

  const checkFromValidation = () => {
    return values.validUsername && values.validEmail && values.validPassword;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = usernameRef.current?.value?.toLowerCase();
    const password = passwordRef.current?.value;
    const email = emailRef.current?.value;
    if (username && password && checkFromValidation()) {
      console.log('yes');
      post('/users', { username, password, email })
        .then(() => login(username, password))
        .then(() => history.push(`/profile/${username}`));
    }
  };

  const handleLogin = () => {
    history.push('/login');
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, validUsername: e.currentTarget.value.length > 0 });
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, validEmail: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.currentTarget.value) });
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, validPassword: e.currentTarget.value.length > 6 });
  };

  return (
    <>
      <div className={classes.formHeader}>Sign Up</div>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          inputRef={usernameRef}
          label="Username"
          error={!values.validUsername}
          helperText={!values.validUsername && 'This field is required'}
          required
          onChange={handleUsernameChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {values.validUsername && values.validUsername !== undefined && <CheckCircle color="primary" />}
              </InputAdornment>
            )
          }}
        />
        <TextField
          inputRef={emailRef}
          label="Email"
          error={!values.validEmail}
          helperText={!values.validEmail && 'Invalid email address'}
          onChange={handleEmailChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {values.validEmail && values.validEmail !== undefined && <CheckCircle color="primary" />}
              </InputAdornment>
            )
          }}
        />
        <TextField
          inputRef={passwordRef}
          label="Password"
          required
          error={!values.validPassword}
          helperText={!values.validPassword && 'Should be at least 6 characters'}
          type={values.showPassword ? 'text' : 'password'}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
                {values.validPassword && values.validPassword !== undefined && <CheckCircle color="primary" />}
              </InputAdornment>
            )
          }}
        />
        <Button variant="contained" type="submit" >submit</Button>
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
