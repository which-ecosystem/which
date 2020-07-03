import React, { useState, useEffect } from 'react';
import { User, Poll } from 'which-types';
import { makeStyles } from '@material-ui/core/styles';

import ProfileInfo from './ProfileInfo';
import Feed from '../../components/Feed/Feed';
import { get } from '../../requests';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from '../../hooks/useNavigate';


const useStyles = makeStyles(theme => ({
  root: {
    width: theme.spacing(75),
    margin: '0 auto'
  }
}));

const ProfilePage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User>();
  const [polls, setPolls] = useState<Poll[]>([]);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const { page, navigate } = useNavigate();
  const { user } = useAuth();
  const classes = useStyles();

  useEffect(() => {
    const id = page?.id || user?._id;
    if (id) {
      get(`/users/${id}`).then(response => {
        setUserInfo(response.data);
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
    <div className={classes.root}>
      <ProfileInfo
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        savedPolls={polls.length}
        totalVotes={totalVotes}
      />
      <Feed polls={[...polls]} />
    </div>
  );
};

export default ProfilePage;
