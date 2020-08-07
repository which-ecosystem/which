import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import urls from './urls';


const PrivateRoute: React.FC<any> = ({ component: ProtectedComponent, ...rest }) => {
  const { isAuthenticated } = useAuth();

  const getComponent: React.FC<any> = (props) => {
    if (props.match.path === urls.login || props.match.path === urls.registration) {
      return isAuthenticated() ? (
        <Redirect to={urls.profile} />
      ) : (
        <ProtectedComponent {...props} />
      );
    }

    return isAuthenticated() ? (
      <ProtectedComponent {...props} />
    ) : (
      <Redirect to={{ pathname: urls.login, state: { from: props.location } }} />
    );
  }

  return <Route {...rest} render={getComponent} />;
};

export default PrivateRoute;
