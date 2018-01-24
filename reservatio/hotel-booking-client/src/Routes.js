import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NewNote from './containers/NewNote';
import Notes from './containers/Notes';
import Reserve from './containers/Reserve/';
import NotFound from './containers/NotFound';
import Overview from './containers/Overview/';
import Bookings from './containers/Bookings/';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute
      path="/login"
      exact
      component={Login}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/signup"
      exact
      component={Signup}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/bookings/:id"
      exact
      component={Bookings}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/bookings"
      exact
      component={Bookings}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/overview"
      exact
      component={Overview}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/rooms/reserve/:id/:startTime?"
      exact
      component={Reserve}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/rooms/new"
      exact
      component={NewNote}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/rooms/:id"
      exact
      component={Notes}
      props={childProps}
    />
    <Route component={NotFound} />
  </Switch>
);
