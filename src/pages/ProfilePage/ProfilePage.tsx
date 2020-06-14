import React from 'react';
import { User } from '../../types';
import SignInForm from './SignInForm';
import ProfileInfo from './ProfileInfo';
import Feed from '../../components/Feed/Feed';

interface PropTypes {
  setUser: (newUser: User | undefined) => void;
  user: User | undefined;
}

const ProfilePage: React.FC<PropTypes> = ({ setUser, user }) => {
  return (
    user
      ? (
        <>
          <ProfileInfo id={user?._id} setUser={setUser} />
          <Feed page="Feed" />
        </>
      )
      : <SignInForm setUser={setUser} />
  );
};

export default ProfilePage;
