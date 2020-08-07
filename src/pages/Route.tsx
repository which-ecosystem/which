import React from 'react';
import { Route as BaseRoute } from 'react-router-dom';


const Route: React.FC<any> = ({ component: Component,  ...rest }) => {
  const render: React.FC<any> = (props) => <Component {...props} />;

  return <BaseRoute render={render} {...rest} />;
};

export default Route;
