import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AppliedRoute from './components/AppliedRoute'

//refactored to domain structure
import Login from './user/LoginForm'
import Membership from './membership/MembershipForm'

//TODO refactor folder structure
import Statistics from './containers/Statistics/'
import Home from './containers/Home/'
import UploadMembers from './containers/UploadMembers/'
import MyPage from './containers/MyPage/'
import SignUp from './containers/SignUp/'
import VerifyEmail from './containers/VerifyEmail/'
import AdminDashboard from './containers/AdminDashboard/'
import SelfHelp from './containers/SelfHelp/'
import Events from './containers/Events/'
import Plans from './containers/Plans/'

import NotFound from './containers/NotFound/'

export default ({ childProps }) => (
  <Switch>
    {routes.map(item => (
      <AppliedRoute
        path={item.path}
        key={item.path}
        exact
        component={item.component}
        props={childProps}
      />
    ))}

    <Route component={NotFound} />
  </Switch>
)

const routes = [
  { path: '/', component: Home },
  { path: '/statistics', component: Statistics },
  { path: '/uploadmembers', component: UploadMembers },
  { path: '/mypage/:page', component: MyPage },
  { path: '/mypage/membership', component: MyPage },
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp },
  { path: '/verifyemail', component: VerifyEmail },
  { path: '/admindashboard', component: AdminDashboard },
  { path: '/sh', component: SelfHelp },
  { path: '/events', component: Events },
  { path: '/plans', component: Plans }
]
