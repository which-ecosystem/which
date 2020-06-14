import React, { useState,useEffect } from 'react';
import { User, Poll } from '../../types';
import ProfileInfo from './ProfileInfo';
import Feed from '../../components/Feed/Feed';
import { get } from '../../requests';

interface PropTypes {
  logOut: () => void;
  id: string;
}

const ProfilePage: React.FC<PropTypes> = ({ logOut, id }) => {
  const [userInfo, setUserInfo] = useState<User>();
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    get(`/users/${id}`).then(response => {
      setUserInfo(response.data);
    });
  },[]);

  useEffect(() => {
    get(`/profiles/${id}`).then(response => {
      setPolls(response.data);
    });
  },[]);


  return (
    <>
      <ProfileInfo user={userInfo} logOut={logOut} />
      <Feed polls={polls} />
    </>
  );
};

export default ProfilePage;
