import React, {useRef, useState} from 'react';
import {Avatar, Badge, TextField, withStyles} from '@material-ui/core/';
import {makeStyles} from '@material-ui/core/styles';
import {User} from 'which-types';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import MoreMenu from "./MoreMenu";
import {patch} from '../../requests';


interface PropTypes {
  user: User | undefined;
  logOut: () => void;
}

const useStyles = makeStyles({
  root: {
    position: 'relative'
  },
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
    textAlign: 'center'
  },
  badge: {
    backgroundColor: 'lightgray'
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
  },
  status: {
    textAlign: 'center',
    color: 'darkgray'
  },
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

const ProfileInfo: React.FC<PropTypes> = ({user, logOut}) => {
  const classes = useStyles();
  const [input,setInput] = useState('hide');
  const urlRef = useRef<HTMLInputElement>();

  const handleClick = () => {
    input === 'hide' ? setInput('show') : setInput('hide');
  };

  const updateAvatar = (event: any) => {
    const id = localStorage.getItem('userId');
    const newAvatar = urlRef.current?.value;
    patch(`/users/${id}`, {avatarUrl: newAvatar}).then(res => {
      console.log(res);
    })
  };

  return (
    <div className={classes.root}>
      {
        user?._id === localStorage.getItem('userId')
          ?
          <div>
            <MoreMenu logOut={logOut}/>
            <div className={classes.avatarContainer}>
              <StyledBadge
                onClick={handleClick}
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent=
                  {
                  <div>
                    <CameraAltIcon/>
                  </div>
                  }
              >
                <Avatar className={classes.avatar} src={user?.avatarUrl}/>
              </StyledBadge>
            </div>
            {
              input === 'show'
                ?<form>
                <TextField
                  inputRef={urlRef}
                  id="url"
                  label="url:"
                  variant="outlined"
                  color="secondary"
                />
                  <button type='submit' onClick={updateAvatar}>upload</button>
                </form>
                : null
            }
          </div>
          : <Avatar className={classes.avatar} src={user?.avatarUrl}/>
      }
      <div className={classes.name}>
        {user?.username}
      </div>
      <div className={classes.status}>
        I am not alcoholic
      </div>
      <div className={classes.profileMenu}>
        <div className={classes.menuButton}>
          <div className={classes.menuNumber}>11</div>
          <div className={classes.menuText}>Polls</div>
        </div>
        <div className={classes.menuButton}>
          <div className={classes.menuNumber}>05.05.2020</div>
          <div className={classes.menuText}>Since</div>
        </div>
        <div className={classes.menuButton}>
          <div className={classes.menuNumber}>17</div>
          <div className={classes.menuText}>Total votes</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
