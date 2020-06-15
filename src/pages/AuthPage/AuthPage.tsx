import React from 'react';
import SignInForm from './SignInForm';

interface PropTypes {
  logIn: (name: string, password: string) => Promise<boolean>;
}

const AuthPage: React.FC<PropTypes> = ({ logIn }) => {
  return <SignInForm logIn={logIn} />;
};

export default AuthPage;

