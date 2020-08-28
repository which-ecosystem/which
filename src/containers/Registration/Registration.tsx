import React, {
  useState,
  useRef,
  FormEvent,
  useMemo
} from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
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

interface ErrorStates {
  username: boolean | undefined;
  email: boolean | undefined;
  password: boolean | undefined;
}

const Registration: React.FC = () => {
  const [values, setValues] = useState<ErrorStates>({
    username: false,
    email: false,
    password: false
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const classes = useStyles();
  const usernameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const { login } = useAuth();
  const history = useHistory();

  const isValid = useMemo(() => {
    return !values.username && !values.email && !values.password;
  }, [values]);

  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = usernameRef.current?.value?.toLowerCase();
    const password = passwordRef.current?.value;
    const email = emailRef.current?.value;
    if (username && password && isValid) {
      post('/users', { username, password, email })
        .then(() => login(username, password))
        .then(() => history.push(`/profile/${username}`));
    }
  };

  const handleLogin = () => {
    history.push('/login');
  };
  const handleClickShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleUsernameChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      username: e.currentTarget.value.length === 0
    });
  };
  const handleEmailChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      email: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.currentTarget.value)
    });
  };
  const handlePasswordChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      password: e.currentTarget.value.length < 6
    });
  };

  return (
    <>
      <div className={classes.formHeader}>Sign Up</div>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          inputRef={usernameRef}
          label="Username"
          error={values.username}
          helperText={values.username && 'This field is required'}
          required
          onBlur={handleUsernameChange}
        />
        <TextField
          inputRef={emailRef}
          label="Email"
          error={values.email}
          helperText={values.email && 'Invalid email address'}
          onBlur={handleEmailChange}
        />
        <TextField
          inputRef={passwordRef}
          label="Password"
          required
          error={values.password}
          helperText={values.password && 'Should be at least 6 characters'}
          type={showPassword ? 'text' : 'password'}
          onBlur={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button variant="contained" type="submit">submit</Button>
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
