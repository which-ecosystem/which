import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Profile = React.lazy(() => import('../Profile/Profile'));
const Feed = React.lazy(() => import('../Feed/Feed'));
const Login = React.lazy(() => import('../Login/Login'));
const Registration = React.lazy(() => import('../Registration/Registration'));
const Home = React.lazy(() => import('../Home/Home'));
const Notifications = React.lazy(() => import('../Notifications/Notifications'));
const PollCreation = React.lazy(() => import('../PollCreation/PollCreation'));


const Router: React.FC = React.memo(() => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/registration" component={Registration} />
    <Route exact path="/feed" component={Feed} />
    <Route exact path="/notifications" component={Notifications} />
    <Route exact path="/new" component={PollCreation} />
    <Route path="/profile/:username" component={Profile} />
  </Switch>
));


export default Router;

