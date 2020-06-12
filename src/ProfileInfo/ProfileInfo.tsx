import React, { useState } from 'react';
import { Avatar } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { User } from '../types';
import { get } from '../requests';

interface PropTypes {
  id: string;
}

const useStyles = makeStyles({
  avatar: {
    margin: '0 auto',
    width: 150,
    height: 150,
    marginBottom: 10
  },
  name: {
    fontSize: 20,
    textAlign: 'center'
  },
  profileMenu: {
    display: 'flex',
    width: '100%',
    height: 50,
    borderBottom: '1px solid lightgray',
    margin: '50px 0'
  },
  menuButton: {
    width: 200,
    height: 50,
    paddingTop: 15,
    textAlign: 'center'
  }
});

const ProfileInfo: React.FC<PropTypes> = ({ id }) => {
  const [userInfo, setUserInfo] = useState<User>();

  get(`/users/${id}`).then(response => {
    setUserInfo(response.data);
  });

  const classes = useStyles();

  return (
    <div>
      <Avatar className={classes.avatar} src={userInfo?.avatarUrl} />
      <div className={classes.name}>
        {userInfo?.name}
      </div>
      <div className={classes.profileMenu}>
        <div style={{ borderBottom: '1px solid green', color: 'green' }} className={classes.menuButton}>
          Polls
        </div>
        <div className={classes.menuButton}>
          Followers
        </div>
        <div className={classes.menuButton}>
          Following
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
