import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { User, Poll } from 'which-types';
import { Container } from '@material-ui/core';

import ProfileInfo from './ProfileInfo';
import Feed from '../../components/Feed/Feed';
import { get } from '../../requests';
import { useAuth } from '../../hooks/useAuth';
import urls from '../urls';


const ProfilePage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User>();
  const [polls, setPolls] = useState<Poll[]>([]);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [isInfoLoading, setIsInfoLoading] = useState(false);
  const [isPollsLoading, setIsPollsLoading] = useState(false);
  const history = useHistory();
  const { username } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    setIsInfoLoading(true);

    const redirect = () => {
      if (user) history.push(urls.profile(user.username));
      else history.push(urls.login);
    };

    if (username) {
      get(`/users?username=${username}`).then(response => {
        if (!response.data.length) return redirect(); // TODO: handle this case
        setUserInfo(response.data[0]);
        setIsInfoLoading(false);
      }).catch(() => redirect());
    } else redirect()

  }, [username, user, history]);


  useEffect(() => {
    if (userInfo?._id) {
      setIsPollsLoading(true);

      get(`/profiles/${userInfo._id}`).then(response => {
        setIsPollsLoading(false);
        setPolls([]);
        setPolls(response.data);
        setTotalVotes(response.data.reduce(
          (total: number, current: Poll) => {
            const { left, right } = current.contents;
            return total + left.votes + right.votes;
          }, 0
        ));
      });
    }
  }, [userInfo])

  return (
    <Container maxWidth="sm" disableGutters>
      <ProfileInfo
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        savedPolls={polls.length}
        totalVotes={totalVotes}
        isLoading={isInfoLoading}
      />
      {isPollsLoading ? <Feed polls={[]} /> : (polls.length > 0 && <Feed polls={polls} />)}
    </Container>
  );
};

export default ProfilePage;
