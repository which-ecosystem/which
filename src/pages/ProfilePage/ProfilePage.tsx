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

const ProfilePage: React.FC<PropTypes> = ({ logOut, id, navigate,setUser }) => {
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
      setPolls([]);
      setPolls([...response.data]);

      // const x = response.data.reduce((a: any, c: any) => a.contents.left.votes + c.contents.left.votes);
      // const y = response.data.reduce((a: any, c: any) => a.contents.right.votes + c.contents.right.votes);
      let sum = 0;
      for(let i = 0;i<response.data.length;i++){
        sum += response.data[i].contents.left.votes;
        sum += response.data[i].contents.right.votes;
      }
      setTotalVotes(sum);
    });
  }, [id, userInfo]);

  return (
    <>
      <ProfileInfo user={userInfo} setUserInfo={setUserInfo} setUser={setUser} logOut={logOut} savedPolls={polls.length} totalVotes={totalVotes}/>
      <Feed polls={[...polls]} navigate={navigate} />
    </>
  );
};

export default ProfilePage;
