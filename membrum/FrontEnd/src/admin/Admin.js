import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

import AdminActionMenu from './AdminActionMenu';
import AdminCardPanel from './AdminCardPanel';

import PaymentStatus from '../membership/PaymentStatus';
import { membershipUpgradeTrail } from '../membership/membershipActions';
import { getAllPlans } from '../membership/membershipReducer';

import FadedLine from '../components/FadedLine';

import mock, { options } from '../mocks/statisticsMock';

import './style.css';
import './AdminActionMenu.css';

import ProfileForm from '../user/ProfileForm';

let RegistrationButton = ({ membershipUpgradeTrail, upgradePlan }) => (
  <button onClick={() => membershipUpgradeTrail(upgradePlan)}>
    Register Member
  </button>
);
RegistrationButton = connect(
  state => ({ upgradePlan: getAllPlans(state.membershipReducer)[5] }),
  { membershipUpgradeTrail }
)(RegistrationButton);

export const MemberRegistration = ({ match }) => (
  <div>
    <ProfileForm />
    <PaymentStatus />
    <RegistrationButton />
  </div>
);

const Dashboard = ({ match }) => (
  <div className="AdminDashboardLayout">
    <AdminCardPanel />
    <div className="AdminStatistic">
      <Line data={mock()} options={options} />
    </div>
  </div>
);

export default ({ match }) => (
  <div>
    <h1 className="DashboardTitle">Dashboard</h1>
    <FadedLine />
    <Dashboard />
    <Route path={`${match.path}`} component={AdminActionMenu} />
  </div>
);
