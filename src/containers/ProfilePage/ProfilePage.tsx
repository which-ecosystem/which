import React, { useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Poll } from 'which-types';
import { Container } from '@material-ui/core';

import ProfileInfo from './ProfileInfo';
import Feed from '../../components/Feed/Feed';
import Loading from '../../components/Loading/Loading';
import { useAuth } from '../../hooks/useAuth';
import { useUser, useProfile } from '../../hooks/APIClient';


const ProfilePage: React.FC = () => {
  const history = useHistory();
  const { username } = useParams();
  const { user } = useAuth();

  const { data: userInfo, mutate: setUserInfo } = useUser(username);
  const { data: polls, isValidating } = useProfile(userInfo?._id);

  useEffect(() => {
    if (!username) {
      if (user) history.push(`/profile/${user.username}`);
      else history.push('/login');
    }
  }, [username, history, user]);


  const totalVotes = useCallback(
    polls.reduce(
      (total: number, current: Poll) => {
        const { left, right } = current.contents;
        return total + left.votes + right.votes;
      }, 0
    ),
    [polls]
  );

  return (
    <Container maxWidth="sm" disableGutters>
      <ProfileInfo
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        savedPolls={polls.length}
        totalVotes={totalVotes}
      />
      {!polls.length && isValidating
        ? <Loading />
        : <Feed polls={polls} />
      }
    </Container>
  );
};

export default ProfilePage;
