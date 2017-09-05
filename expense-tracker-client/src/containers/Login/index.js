// @flow
import {css} from 'aphrodite';
import localForage from 'localforage';
import React, {Component} from 'react';
import {persistStore} from 'redux-persist';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import type {State} from 'reducers/types';
import {login} from 'actions/auth';
import Form from 'components/Form';

import store from './../../store';
import styles from './styles';

type Props = {
  login: () => void,

  // redux
  loginError: string,
  isAuthenticating: boolean,
  isAuthenticed: boolean,
  user: any,
  actions: {
    login: any,
  },

  // router
  history: any,
};

const fields = [
  {
    name: 'email',
    label: 'EMAIL',
    type: 'text',
    options: {
      required: true,
      email: true,
    },
  }, {
    name: 'password',
    label: 'PASSWORD',
    type: 'text',
    options: {
      required: true,
      password: true,
    },
  },
];


class LoginContainer extends Component {
  props: Props;

  componentDidMount() {
    persistStore(store, {storage: localForage}).purge();
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isAuthenticed) {
      this.props.history.push(`/users/${nextProps.user.id}/expenses`);
    }
  }
  onSubmit = (values: any) => {
    this.props.actions.login(values);
  }
  onCreate = () => {
    this.props.history.push('/signup');
  }
  render() {
    return (
      <div className={css(styles.container)}>
        <Form
          style={{height: '55vh', maxWidth: '50%'}}
          fields={fields}
          onSubmit={this.onSubmit}
          showCancel
          cancelButtonText={'CREATE'}
          onCancel={this.onCreate}
          label={'EXPENSE TRACKER LOGIN'}
          error={this.props.loginError}
          isLoading={this.props.isAuthenticating}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  auth: {
    error,
    isAuthenticating,
    isAuthenticed,
    user,
  }}: State,
) => ({
  loginError: error,
  isAuthenticating,
  isAuthenticed,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({login}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
