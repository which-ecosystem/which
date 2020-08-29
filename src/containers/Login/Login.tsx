import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  FormControlLabel,
  Switch,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useAuth } from '../../hooks/useAuth';

interface Fields {
  username: string;
  password: string;
  remember: boolean;
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const classes = useStyles();
  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = async ({ username, password, remember }: Fields) => {
    if (username && password) {
      login(username, password, remember).then(success => {
        if (success) history.push(`/profile/${username}`);
        else setError(true);
      });
    } else setError(true);
  };
  const handleRegistration = () => {
    history.push('/registration');
  };

  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <>
      <div className={classes.formHeader}>Sign In</div>
      <Formik
        initialValues={{ username: '', password: '', remember: true }}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form className={classes.root} autoComplete="off">
            <Field
              name="username"
              label="Login"
              value={values.username}
              error={error}
              as={TextField}
            />
            <Field
              name="password"
              label="Password"
              as={TextField}
              value={values.password}
              error={error}
              helperText={error && 'Invalid credentials'}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={toggleShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Field
              name="remember"
              label="Remember me"
              as={FormControlLabel}
              control={<Switch color="primary" checked={values.remember} size="small" />}
            />
            <Button variant="contained" type="submit" disabled={isSubmitting}>submit</Button>
          </Form>
        )}
      </Formik>
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

