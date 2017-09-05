// @flow
import {css} from 'aphrodite';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import type {State} from 'reducers/types';

import {createUser, createReset} from 'actions/users';
import Form from 'components/Form';
import styles from './styles';

type Props = {
  login: () => void,

  // redux
  isCreating: boolean,
  createError: string,
  createSuccessful: boolean,
  actions: {
    createUser: any,
    createReset: any
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
      containNumber: true,
      minLength: 6,
    },
  }, {
    name: 'passwordConfirm',
    label: 'PASSWORD CONFIRM',
    type: 'text',
    options: {
      required: true,
      passwordConfirm: true,
    },
  },
];


class SignUpContainer extends Component {
  props: Props;

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.createSuccessful) {
      this.props.history.push('/login');
      this.props.actions.createReset();
    }
  }
  onSubmit = (values: any) => {
    this.props.actions.createUser({...values, passwordConfirm: undefined});
  }
  onCancel = () => {
    this.props.history.goBack();
  }
  render() {
    return (
      <div className={css(styles.background)}>
        <Form
          style={{height: '65vh', maxWidth: '50%'}}
          fields={fields}
          onSubmit={this.onSubmit}
          showCancel
          cancelButtonText={'BACK'}
          onCancel={this.onCancel}
          label={'CEATE USER'}
          error={this.props.createError}
          isLoading={this.props.isCreating}
        />
      </div>
    );
  }
}

const mapStateToProps = ({users: {
  isCreating,
  createError,
  createSuccessful,
}}: State) => ({
  isCreating,
  createError,
  createSuccessful,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({createUser, createReset}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
