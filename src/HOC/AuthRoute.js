import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { Context } from '../context/Context';

/**
 * If authenticated then return the requested component.
 * Else redirect.
 */
const AuthRoute = ({ component: Component, ...rest }) => (
  <Context.Consumer>
    {value => (
      <Route
        {...rest}
        render={props =>
          value.data.isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    )}
  </Context.Consumer>
);

export default AuthRoute;
