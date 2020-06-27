import React, { useState, useEffect } from 'react';
import { User, Poll } from 'which-types';

import ProfileInfo from './ProfileInfo';
import Feed from '../../components/Feed/Feed';
import { get } from '../../requests';

interface PropTypes {
  logOut: () => void;
  navigate: (prefix: string, id: string) => void;
  id: string;
  setUser:(a:User)=>void;
}

const ProfilePage: React.FC<PropTypes> = ({
  logOut, id, navigate, setUser
}) => {
  const [userInfo, setUserInfo] = useState<User>();
  const [polls, setPolls] = useState<Poll[]>([]);
  const [totalVotes, setTotalVotes] = useState<number>(0);

  useEffect(() => {
    get(`/users/${id}`).then(response => {
      setUserInfo(response.data);
    });
  }, [id]);

  useEffect(() => {
    get(`/profiles/${id}`).then(response => {
      setPolls(response.data);
      setTotalVotes(response.data.reduce(
        (total: number, current: Poll) => {
          const { left, right } = current.contents;
          return total + left.votes + right.votes;
        }, 0
      ));
    });
  }, [id, userInfo]);

  return (
    <>
      <ProfileInfo
        user={userInfo}
        setUserInfo={setUserInfo}
        setUser={setUser}
        logOut={logOut}
        savedPolls={polls.length}
        totalVotes={totalVotes}
      />
      <Feed polls={[...polls]} navigate={navigate} />
    </>
  );
};

export default ProfilePage;
