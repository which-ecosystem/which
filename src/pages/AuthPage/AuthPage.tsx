import React from 'react';
import { User } from '../../types';
import SignInForm from './SignInForm';

interface PropTypes {
  setUser: (newUser: User | undefined) => void;
  navigate: (prefix: string, id: string) => void;
}

const AuthPage: React.FC<PropTypes> = ({ setUser, navigate }) => {
  return <SignInForm setUser={setUser} navigate={navigate} />;
};

export default AuthPage;

