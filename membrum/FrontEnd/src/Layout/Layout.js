import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { fetchAllPlans } from '../membership/planActions';

import { loadUserProfile } from '../user/profileActions';
import { userRedirected } from '../user/authenticationActions';
import { getAuthorizedRoutes, shouldRedirectUser } from '../user/';

import Home from '../containers/Home/';
import Views from './Views';
import NotFound from './NotFound';

import Navigation from './Navigation';
import Footer from './Footer';

import './App.css';

const renderRoutes = routes =>
  routes.reduce((total, routeId, i) => {
    if (Views.hasOwnProperty(routeId)) {
      const { component: Component, path } = Views[routeId];
      return [
        ...total,
        <Route
          key={i}
          path={path}
          render={props => <Component {...props} />}
        />,
      ];
    } else {
      return total;
    }
  }, []);

class Layout extends Component {
  componentDidUpdate(nextProps) {
    if (this.props.shouldRedirectUser) {
      this.props.userRedirected();
      this.props.history.push('/');
    }
  }

  render() {
    const { authorizedRoutes } = this.props;

    return (
      <div className="App">
        <Route
          path="/"
          render={() => (
            <Navigation
              authorizedRoutes={authorizedRoutes.map(routeId => Views[routeId])}
            />
          )}
        />
        <div className="AppContent">
          <Switch>
            {renderRoutes(authorizedRoutes)}
            <Route path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    authorizedRoutes: getAuthorizedRoutes(state.userReducer),
    shouldRedirectUser: shouldRedirectUser(state.userReducer),
  };
};

const mapDispatchToProps = {
  loadUserProfile,
  fetchAllPlans,
  userRedirected,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
