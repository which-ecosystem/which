import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import VerifiedIcon from '@material-ui/icons/CheckCircleOutline';
import { CardHeader } from '@material-ui/core/';
import { User } from 'which-types';

import Avatar from '../Avatar/Avatar';


interface PropTypes {
  user: User;
  info?: string | JSX.Element;
  action?: JSX.Element;
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
  }
}));


const UserStrip: React.FC<PropTypes> = ({ user, info, action }) => {
  const classes = useStyles();
  const { username, verified } = user;

  const avatar = <Avatar user={user} />;

  const title = (
    <div className={classes.root}>
      {username}
      {verified && <VerifiedIcon color="primary" className={classes.verified} />}
    </div>
  );

  return <CardHeader avatar={avatar} title={title} subheader={info} action={action} />;
};

export default UserStrip;
