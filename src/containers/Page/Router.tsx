import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Location } from 'history';

import PollCreation from '../PollCreation/PollCreation';

const Profile = React.lazy(() => import('../Profile/Profile'));
const Feed = React.lazy(() => import('../Feed/Feed'));
const Login = React.lazy(() => import('../Login/Login'));
const Registration = React.lazy(() => import('../Registration/Registration'));
const Home = React.lazy(() => import('../Home/Home'));
const Notifications = React.lazy(() => import('../Notifications/Notifications'));

export interface LocationState {
  background?: Location;
}

const Router: React.FC = React.memo(() => {
  const location = useLocation<LocationState>();
  const background = location.state && location.state.background;

  const ModalSwitch = (
    <Switch>
      <Route path="/new" component={PollCreation} />
    </Switch>
  );

  return (
    <>
      {background && ModalSwitch}
      <Switch location={background || location}>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/notifications" component={Notifications} />
        <Route path="/feed" component={Feed} />
        <Route path="/profile/:username" component={Profile} />
      </Switch>
    </>
  );
});


export default Router;

