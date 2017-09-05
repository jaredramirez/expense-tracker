// @flow
import Login from 'containers/Login';
import SignUp from 'containers/SignUp';
import AuthUserEdit from 'containers/AuthUserEdit';
import UsersDashboard from 'containers/UsersDashboard';
import UserEdit from 'containers/UserEdit';
import ExpensesDashboard from 'containers/ExpensesDashboard';
import ExpenseEdit from 'containers/ExpenseEdit';
import ExpensesPrintForm from 'containers/ExpensesPrintForm';
import Print from 'components/Print';

import UserEditHOC from 'containers/UserEditHOC';

export type Route = {
  name: string,
  path: string,
  component: any,
  exact?: boolean,

  requireAuth?: boolean,
  hasNavbar?: boolean,
  render?: any,
};

const routes: Array<Route> = [
  {
    name: 'Users',
    path: '/users',
    component: UsersDashboard,
    requireAuth: true,
    hasNavbar: true,
    exact: true,
  }, {
    name: 'User',
    path: '/users/:userId',
    component: UserEditHOC(AuthUserEdit, UserEdit),
    requireAuth: true,
    hasNavbar: true,
    exact: true,
  }, {
    name: 'Expenses',
    path: '/users/:userId/expenses',
    component: ExpensesDashboard,
    requireAuth: true,
    hasNavbar: true,
    exact: true,
  }, {
    name: 'ExpensesPrintForm',
    path: '/users/:userId/expenses/print/form',
    component: ExpensesPrintForm,
    requireAuth: true,
    hasNavbar: true,
    exact: true,
  }, {
    name: 'ExpensesPrint',
    path: '/users/:userId/expenses/print/form/page',
    component: Print,
    requireAuth: true,
    hasNavbar: true,
    exact: true,
  }, {
    name: 'Expense',
    path: '/users/:userId/expenses/:expenseId',
    component: ExpenseEdit,
    requireAuth: true,
    hasNavbar: true,
    exact: true,
  }, {
    name: 'Login',
    path: '/login',
    component: Login,
    exact: true,
  }, {
    name: 'SignUp',
    path: '/signup',
    component: SignUp,
    exact: true,
  }, {
    name: 'Default',
    path: '/',
    component: Login,
    exact: true,
  },
];

export default routes;
