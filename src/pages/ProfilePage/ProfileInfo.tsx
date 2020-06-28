import React, { useState } from 'react';
import { Avatar, Badge, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { User } from 'which-types';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import VerifiedIcon from '@material-ui/icons/CheckCircleOutline';
import MoreMenu from './MoreMenu';
import Highlight from './Highlight';
import UploadImage from '../../components/UploadImage/UploadImage';


interface PropTypes {
  user: User | undefined;
  logOut: () => void;
  savedPolls: number;
  totalVotes: number;
  setUserInfo: (a: User) => void;
  setUser: (a:User) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
  },
  avatar: {
    width: 150,
    height: 150,
    margin: '0 auto'
  },
  name: {
    margin: theme.spacing(1, 0),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  verified: {
    marginLeft: theme.spacing(0.5),
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  profileMenu: {
    display: 'flex',
    width: '100%',
    height: 50,
    margin: '50px 0',
    borderBottom: '1px solid lightgray'
  },
  menuButton: {
    width: 200,
    height: 50,
    textAlign: 'center'
  },
  badge: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    borderRadius: '50%',
    cursor: 'pointer',
    background: '#d3d3d3',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      margin: '0 auto'
    }
  },
  avatarContainer: {
    position: 'relative',
    textAlign: 'center'
  },
  menuNumber: {
    fontWeight: 800,
    color: 'black'
  },
  menuText: {
    color: 'darkgray'
  }
}));


const ProfileInfo: React.FC<PropTypes> = ({
  user, logOut, savedPolls, totalVotes, setUserInfo, setUser
}) => {
  const classes = useStyles();
  const [input, setInput] = useState(false);

  const dateSince = new Date(user?.createdAt || '').toLocaleDateString();

  const handleClick = () => {
    setInput(!input);
  };

  return (
    <div className={classes.root}>
      {
        user?._id === localStorage.getItem('userId')
          ? (
            <div>
              <MoreMenu logOut={logOut} />
              <div className={classes.avatarContainer}>
                <Badge
                  onClick={handleClick}
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  badgeContent={(
                    <div className={classes.badge}>
                      <CameraAltIcon />
                    </div>
                  )}
                >
                  <Avatar className={classes.avatar} src={user?.avatarUrl} />
                </Badge>
              </div>
              <UploadImage displayD={input} setDisplayD={setInput} setUserInfo={setUserInfo} setUser={setUser} />
            </div>
)
          : <Avatar className={classes.avatar} src={user?.avatarUrl} />
      }
      <Typography variant="h5" className={classes.name}>
        {user?.username}
        {user?.verified && <VerifiedIcon className={classes.verified} color="primary" />}
      </Typography>
      <div className={classes.profileMenu}>
        <Highlight text="Polls" value={savedPolls} />
        <Highlight text="Since" value={dateSince} />
        <Highlight text="Total votes" value={totalVotes} />
      </div>
    </div>
  );
};

export default ProfileInfo;
