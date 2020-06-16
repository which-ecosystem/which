import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { Authorization } from '../../types';


interface PropTypes {
  logIn: (name: string, password: string) => Promise<boolean>;
}

const AuthPage: React.FC<PropTypes> = ({ logIn }) => {
  const [authorization, setAuthorization] = useState<Authorization>({ authorize: 'signIn' });

  return (
    <>
      {authorization.authorize === 'signIn' && <SignInForm logIn={logIn} setAuthorization={setAuthorization} />}
      {authorization.authorize === 'signUp' && <SignUpForm logIn={logIn} setAuthorization={setAuthorization} />}
    </>
  );
};

export default AuthPage;

