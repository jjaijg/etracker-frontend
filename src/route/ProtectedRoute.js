import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, roles, ...rest }) {
  const { user } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          return <Redirect to={{ pathname: '/login' }} />;
        }

        // logged in so return component
        return <Component {...props} {...rest} />;
      }}
    />
  );
}

export default PrivateRoute;
