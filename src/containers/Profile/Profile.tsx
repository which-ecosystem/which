import React, { useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Poll } from 'which-types';
import { Container } from '@material-ui/core';

import ProfileInfo from './ProfileInfo';
import PollsList from '../../components/PollsList/PollsList';
import Loading from '../../components/Loading/Loading';
import Fab from '../../components/Fab/Fab';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useAuth } from '../../hooks/useAuth';
import { useUser, useProfile } from '../../hooks/APIClient';


const Profile: React.FC = () => {
  const history = useHistory();
  const { username } = useParams();
  const { user } = useAuth();

  const { data: userInfo, mutate: setUserInfo } = useUser(username);
  const { data: polls, mutate: mutatePolls, isValidating } = useProfile(username);

  useEffect(() => {
    if (!username) {
      if (user) history.push(`/profile/${user.username}`);
      else history.push('/login');
    }
  }, [username, history, user]);


  const totalVotes = useMemo(() => polls?.reduce(
    (total: number, current: Poll) => {
      const { left, right } = current.contents;
      return total + left.votes + right.votes;
    }, 0
  ) || 0, [polls]);

  return (
    <Container maxWidth="sm" disableGutters>
      <ProfileInfo
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        savedPolls={polls?.length || 0}
        totalVotes={totalVotes}
      />
      {
        polls
          ? polls.length
            ? <PollsList polls={polls} mutate={mutatePolls} />
            : <EmptyState />
          : isValidating && <Loading />
      }
      {user?.username === username && <Fab />}
    </Container>
  );
};

export default Profile;
