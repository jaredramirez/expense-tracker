// @flow
import React from 'react';
import {connect} from 'react-redux';
import {
  BrowserRouter,
  Route,
  Redirect,
} from 'react-router-dom';

import type {State} from 'reducers/types';

import type {Route as RouteType} from './routes';
import routes from './routes';

const configureRoute = (
  isAuthenticed: boolean,
  {
    onNavbar,
    requireAuth,
    hasNavbar,
    component,
    ...rest
  }: RouteType,
) => ({
  ...rest,
  render: componentProps => !isAuthenticed && requireAuth
    ? <Redirect to={{pathname: '/login'}} />
    : React.createElement(component, componentProps),
});

type Props = {
  isAuthenticed: boolean,
};

const Router = ({isAuthenticed}: Props) => (
  <BrowserRouter>
    <div>
      {routes.map((routeMeta: RouteType) => (
        <Route key={routeMeta.name} {...configureRoute(isAuthenticed, routeMeta)} />
      ))}
    </div>
  </BrowserRouter>
);

const mapStateToProps = (state: State) => ({
  isAuthenticed: state.auth.isAuthenticed,
});

export default connect(mapStateToProps)(Router);
