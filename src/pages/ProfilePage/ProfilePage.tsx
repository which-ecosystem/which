import React, { useState } from 'react';
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

  get(`/users/${id}`).then(response => {
    setUserInfo(response.data);
  });

  get(`/profiles/${id}`).then(response => {
    setPolls(response.data);
  });

  return (
    <>
      <ProfileInfo user={userInfo} logOut={logOut} />
      <Feed polls={polls} />
    </>
  )
};

export default ProfilePage;
