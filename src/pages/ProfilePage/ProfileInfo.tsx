import React from 'react';
import {Avatar, Badge, withStyles} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button/Button';
import { User } from 'which-types';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

interface PropTypes {
  user: User | undefined;
  logOut: () => void;
}

const useStyles = makeStyles({
  avatar: {
    width: 150,
    height: 150,
    margin: '0 auto'
  },
  name: {
    fontSize: 20,
    textAlign: 'center',
    margin: '10px 0'
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
  },
  badge: {
    backgroundColor: 'lightgray'
  },
  avatarContainer: {
    position: 'relative',
    textAlign: 'center'
  }
});


const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: 'lightgray',
    width: 40,
    height: 40,
    borderRadius: '50%',
    cursor: 'pointer'
  },
}))(Badge);

const ProfileInfo: React.FC<PropTypes> = ({ user, logOut }) => {
  const classes = useStyles();
  return (
    <div>
      {
        user?._id === localStorage.getItem('userId')
          ? <div className={classes.avatarContainer}>
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              badgeContent={<CameraAltIcon />}
            >
              <Avatar className={classes.avatar} src={user?.avatarUrl} />
            </StyledBadge>
          </div>
          : <Avatar className={classes.avatar} src={user?.avatarUrl} />
      }
      <div className={classes.name}>
        {user?.username}
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
      {
        user?._id === localStorage.getItem('userId')
          ? <Button variant="contained" onClick={logOut}>Log Out</Button>
          : null
      }
    </div>
  );
};

export default ProfileInfo;
