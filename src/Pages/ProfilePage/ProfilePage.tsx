import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {User} from '../../types';
import SignInForm from "./SignInForm";
import ProfileInfo from "./ProfileInfo";

interface PropTypes {
  id: string;
  setUser: (newUser: User | undefined) => void;
  user: User | undefined;
}

const useStyles = makeStyles({

});

const ProfilePage: React.FC<PropTypes> = ({id, setUser, user}) => {
  const classes = useStyles();

  return (
    user ? (
          <>
            <ProfileInfo id={user?._id || ''} setUser={setUser} />
          </>
        )
        : <SignInForm setUser={setUser} />
  )
};

export default ProfilePage;
