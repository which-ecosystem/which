import React from 'react';
import { User } from '../../types';
import SignInForm from './SignInForm';

interface PropTypes {
  setUser: (newUser: User | undefined) => void;
}

const AuthPage: React.FC<PropTypes> = ({ setUser }) => {
  return <SignInForm setUser={setUser} />;
};

export default AuthPage;

