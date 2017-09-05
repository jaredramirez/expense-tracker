// @flow
import {css} from 'aphrodite';
import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {bindActionCreators} from 'redux';

import type {State, User} from 'reducers/types';

import {logout} from 'actions/auth';

import {BackArrow, shouldShowArrow, shouldShowExpenses} from './utils';
import styles from './styles';

type Props = {
  children: any,

  // router
  history: any,
  match: {
    path: string,
    params: {
      userId: string,
    },
  },

  // redux
  id: string,
  access: number,
  email: string,
  users: Array<User>,
  actions: any,
};

const getEmailString =
  (authUser: {id: string, email: string}, id: string, users: Array<User>) => {
    if (authUser.id === id) {
      return `Expenses for: ${authUser.email}`;
    }

    const user = users.find(curUser => curUser.id === id);
    if (user) {
      return `Expenses for: ${user.email}`;
    }
    return '';
  };

const onClick = (history: any) => {
  history.goBack();
};

const Header = ({children, history, match, id, access, email, users, actions}: Props) => (
  <div>
    <div className={css(styles.container)}>
      <div className={css(styles.left)}>
        {
          shouldShowArrow(match.path, id, match.params.userId)
            ? <BackArrow onClick={() => onClick(history)} />
            : null
        }
        <span className={css(styles.for)}>
          {
            shouldShowExpenses(match.path)
              ? getEmailString({id, email}, match.params.userId, users)
              : null
          }
        </span>
      </div>
      <div className={css(styles.right)}>
        {email}
        <NavLink
          to={`/users/${id}`}
          className={css(styles.link)}
          activeClassName={css(styles.linkActive)}
        >
          <span>Account</span>
        </NavLink>
        {
          access > 0 ? (
            <NavLink
              to={match.path === '/users' ? `/users/${id}/expenses` : '/users'}
              className={css(styles.link)}
              activeClassName={css(styles.linkActive)}
            >
              <span>{match.path === '/users' ? 'Expenses' : 'Manage'}</span>
            </NavLink>
          ) : null
        }
        <NavLink
          onClick={actions.logout}
          to={'/login'}
          className={css(styles.link)}
          activeClassName={css(styles.linkActive)}
        >
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
    {children}
  </div>
);

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators({logout}, dispatch),
});

const mapStateToProps = ({auth: {user}, users: {users}}: State) => ({
  id: user.id,
  access: user.access,
  email: user.email,
  users,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
