import React from "react"
import { Route, Switch } from "react-router-dom"

import AppliedRoute from "../../components/AppliedRoute"

import Statistics from "../Statistics/"
import Home from "../Home/"
import UploadMembers from "../UploadMembers/"
import MyPage from "../MyPage/"
import Login from "../Login/"
import SignUp from "../SignUp/"
import VerifyEmail from "../VerifyEmail/"
import AdminDashboard from "../AdminDashboard/"
import SelfHelp from "../SelfHelp/"
import Events from "../Events/"
import Plans from "../Plans/"

import NotFound from "../NotFound/"

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
  { path: "/", component: Home },
  { path: "/statistics", component: Statistics },
  { path: "/uploadmembers", component: UploadMembers },
  { path: "/mypage/:page", component: MyPage },
  { path: "/login", component: Login },
  { path: "/signup", component: SignUp },
  { path: "/verifyemail", component: VerifyEmail },
  { path: "/admindashboard", component: AdminDashboard },
  { path: "/sh", component: SelfHelp },
  { path: "/events", component: Events },
  { path: "/plans", component: Plans }
]
