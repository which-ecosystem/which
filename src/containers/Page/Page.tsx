import React, { Suspense } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { Switch, Route } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

const Profile = React.lazy(() => import('../Profile/Profile'));
const Feed = React.lazy(() => import('../Feed/Feed'));
const Login = React.lazy(() => import('../Login/Login'));
const Registration = React.lazy(() => import('../Registration/Registration'));
const Home = React.lazy(() => import('../Home/Home'));
const Notifications = React.lazy(() => import('../Notifications/Notifications'));


const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(15, 0, 12, 0)
    },
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(15, 5, 8, 5)
    }
  }
}));


const Page: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SnackbarProvider
      maxSnack={isMobile ? 1 : 3}
      anchorOrigin={{
        vertical: isMobile ? 'top' : 'bottom',
        horizontal: 'right'
      }}
    >
      <div className={classes.root}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/feed" component={Feed} />
            <Route exact path="/notifications" component={Notifications} />
            <Route path="/profile/:username" component={Profile} />
          </Switch>
        </Suspense>
      </div>
    </SnackbarProvider>
  );
};


export default Page;

