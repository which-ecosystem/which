import React, { useState,useEffect } from 'react';
import { User, Poll } from '../../types';
import ProfileInfo from './ProfileInfo';
import Feed from '../../components/Feed/Feed';
import { get } from '../../requests';

interface PropTypes {
  logOut: () => void;
  navigate: (prefix: string, id: string) => void;
  id: string;
}

const ProfilePage: React.FC<PropTypes> = ({ logOut, id, navigate }) => {
  const [userInfo, setUserInfo] = useState<User>();
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    get(`/users/${id}`).then(response => {
      setUserInfo(response.data);
    });
  }, [id]);

  useEffect(() => {
    get(`/profiles/${id}`).then(response => {
      setPolls(response.data);
    });
  }, [id]);


  return (
    <>
      <ProfileInfo user={userInfo} logOut={logOut} />
      <Feed polls={polls} navigate={navigate} />
    </>
  );
};

export default ProfilePage;
