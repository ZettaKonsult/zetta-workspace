import User from '../user/User';
import LoginForm from '../user/LoginForm';
import Plan from '../membership/Plan';
import AdminDashboard from '../admin/Admin';
import MemberFind from '../admin/MemberFind';
import { MemberRegistration } from '../admin/Admin';
import MembershipForm from '../membership/MembershipForm';

export default {
  profile: {
    path: '/user',
    label: 'Profile',
    component: User,
  },
  login: {
    path: '/login',
    label: 'Login',
    component: LoginForm,
  },
  plans: {
    path: '/plans',
    label: 'Plans',
    component: Plan,
  },
  admin: {
    path: '/',
    label: 'Dashboard',
    component: AdminDashboard,
  },
  memberfind: {
    path: '/find',
    label: 'Find Member',
    component: MemberFind,
  },
  registration: {
    path: '/registration',
    label: 'Register Member',
    component: MemberRegistration,
  },
  adminmemberedit: {
    path: '/memberedit',
    label: 'Edit Member',
    component: MembershipForm,
  },
};
