import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProfilePage from './ProfilePage/ProfilePage';
import FeedPage from './FeedPage/FeedPage';
import AuthPage from './AuthPage/AuthPage';
import { useNavigate } from '../hooks/useNavigate';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.spacing(75),
    marginTop: theme.spacing(15),
    margin: '0 auto'
  }
}));

const Page: React.FC = () => {
  const { page } = useNavigate();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      { page.prefix === 'profile' && <ProfilePage />}
      { page.prefix === 'feed' && <FeedPage /> }
      { page.prefix === 'auth' && <AuthPage /> }
    </div>
  );
};


export default Page;

