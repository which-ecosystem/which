import React from 'react';
import { User } from '../../types';
import SignInForm from './SignInForm';
import ProfileInfo from './ProfileInfo';

interface PropTypes {
  setUser: (newUser: User | undefined) => void;
  user: User | undefined;
}

const ProfilePage: React.FC<PropTypes> = ({ setUser, user }) => {
  return (
    user ? <ProfileInfo id={user?._id || ''} setUser={setUser} />
      : <SignInForm setUser={setUser} />
  );
};

export default ProfilePage;
