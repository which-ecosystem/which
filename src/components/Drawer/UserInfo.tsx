import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User } from 'which-types';

import Avatar from '../Avatar/Avatar';

interface PropTypes {
  user: User;
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4, 10),
    textAlign: 'center'
  },
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14)
  }
}));


const UserInfo: React.FC<PropTypes> = React.memo(({ user }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar user={user} className={classes.avatar} />
      <Typography variant="h5">
        {user.username}
      </Typography>
    </div>
  );
});

export default UserInfo;

