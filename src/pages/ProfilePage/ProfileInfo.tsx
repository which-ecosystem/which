import React, { useState } from 'react';
import { Avatar, Badge, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { User } from 'which-types';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import VerifiedIcon from '@material-ui/icons/CheckCircleOutline';
import MoreMenu from './MoreMenu';
import Highlight from './Highlight';
import UploadImage from '../../components/UploadImage/UploadImage';
import { patch } from '../../requests';
import { useAuth } from '../../hooks/useAuth';


interface PropTypes {
  savedPolls: number;
  totalVotes: number;
  userInfo: User | undefined;
  setUserInfo: (userInfo: User) => void;
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
  savedPolls, totalVotes, setUserInfo, userInfo
}) => {
  const classes = useStyles();
  const [input, setInput] = useState(false);
  const { setUser } = useAuth();


  const dateSince = new Date(userInfo?.createdAt || '').toLocaleDateString();

  const handleClick = () => {
    setInput(!input);
  };

  const patchAvatar = (url: string) => {
    const id = localStorage.getItem('userId');
    patch(`/users/${id}`, { avatarUrl: url }).then(res => {
      setUserInfo(res.data);
      setUser(res.data);
    });
  };

  return (
    <div className={classes.root}>
      {
        userInfo?._id === localStorage.getItem('userId')
          ? (
            <div>
              <MoreMenu />
              <div className={classes.avatarContainer}>
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  badgeContent={(
                    <div className={classes.badge}>
                      <CameraAltIcon onClick={handleClick} />
                    </div>
                  )}
                >
                  <Avatar className={classes.avatar} src={userInfo?.avatarUrl} />
                </Badge>
              </div>
              <UploadImage isOpen={input} setIsOpen={setInput} callback={patchAvatar} />
            </div>
)
          : <Avatar className={classes.avatar} src={userInfo?.avatarUrl} />
      }
      <Typography variant="h5" className={classes.name}>
        {userInfo?.username}
        {userInfo?.verified && <VerifiedIcon className={classes.verified} color="primary" />}
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
