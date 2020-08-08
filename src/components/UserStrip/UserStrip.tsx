import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import VerifiedIcon from '@material-ui/icons/CheckCircleOutline';
import { Avatar, CardHeader } from '@material-ui/core/';
import { User } from 'which-types';


interface PropTypes {
  user: User;
  info?: string | JSX.Element
}


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  verified: {
    marginLeft: theme.spacing(0.5),
    width: theme.spacing(2),
    height: theme.spacing(2)
  },
  avatar: {
    cursor: 'pointer'
  }
}));


const UserStrip: React.FC<PropTypes> = ({ user, info }) => {
  const classes = useStyles();
  const history = useHistory();
  const { username, avatarUrl, verified } = user;

  const handleNavigate = () => {
    history.push(`/profile/${username}`);
  };

  const avatar = (
    <Avatar
      src={avatarUrl}
      alt={username[0].toUpperCase()}
      onClick={handleNavigate}
      className={classes.avatar}
    />
  );

  const title = (
    <div className={classes.root}>
      {username}
      {verified && <VerifiedIcon color="primary" className={classes.verified} />}
    </div>
  );

  return <CardHeader avatar={avatar} title={title} subheader={info} />;
};

export default UserStrip;
