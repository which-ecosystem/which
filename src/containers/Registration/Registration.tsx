import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
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

interface Fields {
  username: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  username: Yup.string()
    .lowercase('Must be lowercase')
    .required('This field is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('This field is required'),
  password: Yup.string()
    .min(6, 'Should be at least 6 characters')
    .required('This field is required'),
});

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
  },
}));

const Registration: React.FC = () => {
  const classes = useStyles();
  const { login } = useAuth();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = () => {
    history.push('/login');
  };

  const handleSubmit = ({ username, email, password }: Fields) => {
    post('/users', { username, email, password })
      .then(() => login(username, password))
      .then(() => history.push(`/profile/${username}`));
  }

  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <>
      <div className={classes.formHeader}>Sign Up</div>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form className={classes.root} autoComplete="off">
            <Field
              id="username"
              name="username"
              label="Username"
              value={values.username.toLowerCase()}
              error={touched.username && !!errors.username}
              helperText={touched.username && errors.username}
              required
              as={TextField}
            />
            <Field
              name="email"
              label="Email"
              value={values.email}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              required
              as={TextField}
            />
            <Field
              name="password"
              label="Password"
              value={values.password}
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              required
              type={showPassword ? 'text' : 'password'}
              as={TextField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={toggleShowPassword} >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button variant="contained" type="submit" disabled={isSubmitting}>submit</Button>
          </Form>
        )}
      </Formik>
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
