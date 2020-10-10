import React, { useState, useCallback, useMemo } from 'react';
import { Badge, Typography, CircularProgress } from '@material-ui/core/';
import { CameraAlt, CheckCircleOutline } from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { User } from 'which-types';

import Highlight from './Highlight';
import FileUpload from '../../components/FileUpload/FileUpload';
import Avatar from '../../components/Avatar/Avatar';
import { patch } from '../../requests';
import { useAuth } from '../../hooks/useAuth';
import uploadFileToS3 from '../../utils/uploadFileToS3';

interface PropTypes {
  savedPolls: number;
  totalVotes: number;
  userInfo: User | undefined;
  setUserInfo: (userInfo: User) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    marginBottom: theme.spacing(4)
  },
  avatar: {
    width: 150,
    height: 150,
    position: 'relative',
    margin: '0 auto'
  },
  darken: {
    filter: 'brightness(50%)'
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
    marginTop: theme.spacing(6),
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuNumber: {
    fontWeight: 800,
    color: 'black'
  },
  menuText: {
    color: 'darkgray'
  },
  skeleton: {
    margin: '10px auto',
    borderRadius: 2
  },
  progress: {
    position: 'absolute',
    color: 'white'
  }
}));


const formatDate = (value: Date | string = ''): string => {
  const date = new Date(value);
  const day = (`0${date.getDate()}`).slice(-2);
  const month = (`0${date.getMonth()}`).slice(-2);
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};


const ProfileInfo: React.FC<PropTypes> = ({
  savedPolls, totalVotes, setUserInfo, userInfo
}) => {
  const classes = useStyles();
  const { user } = useAuth();
  const [progress, setProgress] = useState<number>(0);

  const dateSince = useMemo(() => formatDate(userInfo?.createdAt), [userInfo]);

  const handleUpdateAvatar = useCallback(async (file: File) => {
    if (user) {
      uploadFileToS3(file, 0.8, setProgress)
        .then(avatarUrl => patch(`/users/${user._id}`, { avatarUrl }))
        .then(response => setUserInfo(response.data))
        .then(() => setProgress(0));
    }
  }, [user, setUserInfo]);

  return (
    <div className={classes.root}>
      {
        !userInfo
          ? <Skeleton animation="wave" variant="circle" width={150} height={150} className={classes.avatar} />
          : userInfo?._id === user?._id
            ? (
              <div className={classes.avatarContainer}>
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  className={classes.avatarContainer}
                  badgeContent={(
                    <FileUpload callback={handleUpdateAvatar}>
                      <div className={classes.badge}>
                        <CameraAlt />
                      </div>
                    </FileUpload>
                  )}
                >
                  <Avatar className={[classes.avatar, progress && classes.darken].join(' ')} user={userInfo} />
                  {progress > 0 && (
                    <CircularProgress variant="static" value={progress} className={classes.progress} />
                  )}
                </Badge>
              </div>
            )
            : <Avatar className={classes.avatar} user={userInfo} />
      }
      {
        !userInfo
          ? <Skeleton animation="wave" variant="rect" width={100} height={20} className={classes.skeleton} />
          : (
            <Typography variant="h5" className={classes.name}>
              {userInfo?.username}
              {userInfo?.verified && <CheckCircleOutline className={classes.verified} color="primary" />}
            </Typography>
          )
      }
      <div className={classes.profileMenu}>
        {
          !userInfo
            ? (
              <>
                <Skeleton animation="wave" variant="rect" width={170} height={20} className={classes.skeleton} />
                <Skeleton animation="wave" variant="rect" width={170} height={20} className={classes.skeleton} />
                <Skeleton animation="wave" variant="rect" width={170} height={20} className={classes.skeleton} />
              </>
            )
            : (
              <>
                <Highlight text="Polls" value={savedPolls} />
                <Highlight text="Since" value={dateSince} />
                <Highlight text="Total votes" value={totalVotes} />
              </>
            )
        }
      </div>
    </div>
  );
};

export default ProfileInfo;
