import React, { useState, useEffect } from 'react';
import { User, Poll } from 'which-types';

import ProfileInfo from './ProfileInfo';
import Feed from '../../components/Feed/Feed';
import { get } from '../../requests';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from '../../hooks/useNavigate';


const ProfilePage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User>();
  const [polls, setPolls] = useState<Poll[]>([]);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const { page, navigate } = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const id = page?.id || user?._id
    if (id) {
      get(`/users/${id}`).then(response => {
        setUserInfo(response.data);
      });
      get(`/profiles/${id}`).then(response => {
        setPolls(response.data);
        setTotalVotes(response.data.reduce(
          (total: number, current: Poll) => {
            const { left, right } = current.contents;
            return total + left.votes + right.votes;
          }, 0
        ));
      });
    } else navigate('auth');
  }, [navigate, page, user]);

  return (
    <>
      <ProfileInfo
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        savedPolls={polls.length}
        totalVotes={totalVotes}
      />
      <Feed polls={[...polls]} />
    </>
  );
};

export default ProfilePage;
