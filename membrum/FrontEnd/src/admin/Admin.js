import React from 'react';
import { Route } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

import AdminActionMenu from './AdminActionMenu';
import AdminCardPanel from './AdminCardPanel';
import MemberFind from './MemberFind';

import FadedLine from '../components/FadedLine';

import mock, { options } from '../mocks/statisticsMock';

import './style.css';
import './AdminActionMenu.css';

import ProfileForm from '../user/ProfileForm';

const RegistrationButton = () => <button>Register Member</button>;

export const MemberRegistration = ({ match }) => (
  <div>
    <ProfileForm />
    <RegistrationButton />
  </div>
);

const Dashboard = ({ match }) => (
  <div className="AdminDashboardLayout">
    {console.log(mock())}
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
