import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const useStyles = makeStyles({
  formTransfer: {
    display: 'flex',
    justifyContent: 'center'
  },
  transferButton: {
    marginLeft: 10,
    color: 'green',
    cursor: 'pointer'
  }
});

const AuthPage: React.FC = () => {
  const [auth, setAuth] = useState<'signIn' | 'signUp'>('signIn');
  const classes = useStyles();

  const handleRedirect = () => {
    setAuth(auth === 'signIn' ? 'signUp' : 'signIn');
  };

  const footerInfo = {
    signIn: ['Don\'t have an account?', 'Sign up'],
    signUp: ['Already have an account?', 'Sign in']
  };

  return (
    <>
      {auth === 'signIn' && <SignInForm />}
      {auth === 'signUp' && <SignUpForm />}
      <div className={classes.formTransfer}>
        <div>{footerInfo[auth][0]}</div>
        <span
          onClick={handleRedirect}
          className={classes.transferButton}
          role="presentation"
        >
          {footerInfo[auth][1]}
        </span>
      </div>
    </>
  );
};

export default AuthPage;

