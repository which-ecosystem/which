import React, { useState, useEffect } from 'react';
import { User, Poll } from 'which-types';
import { Container } from '@material-ui/core';

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
  const [isInfoLoading, setIsInfoLoading] = useState(false);

  useEffect(() => {
    const id = page?.id || user?._id;
    setIsInfoLoading(true);
    if (id) {
      get(`/users/${id}`).then(response => {
        setUserInfo(response.data);
        setIsInfoLoading(false);
      });
      get(`/profiles/${id}`).then(response => {
        setPolls([]);
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
    <Container maxWidth="sm" disableGutters>
      <ProfileInfo
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        savedPolls={polls.length}
        totalVotes={totalVotes}
        isLoading={isInfoLoading}
      />
      <Feed polls={[...polls]} />
    </Container>
  );
};

export default ProfilePage;
