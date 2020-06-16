import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';


interface PropTypes {
  logIn: (name: string, password: string) => Promise<boolean>;
}

const AuthPage: React.FC<PropTypes> = ({ logIn }) => {
  const [auth, setAuth] = useState<String>('signIn');

  return (
    <>
      {auth === 'signIn' && <SignInForm logIn={logIn} setAuth={setAuth} />}
      {auth === 'signUp' && <SignUpForm logIn={logIn} setAuth={setAuth} />}
    </>
  );
};

export default AuthPage;

