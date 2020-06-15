import React from 'react';
import { User } from '../../types';
import SignInForm from './SignInForm';

interface PropTypes {
  logIn: (name: string, password: string) => void;
  navigate: (prefix: string, id: string) => void;
}

const AuthPage: React.FC<PropTypes> = ({ logIn, navigate }) => {
  return <SignInForm logIn={logIn} navigate={navigate} />;
};

export default AuthPage;

