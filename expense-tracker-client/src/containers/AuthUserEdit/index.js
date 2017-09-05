// @flow
import {css} from 'aphrodite';
import {isEqual} from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import type {State as ReduxState, User} from 'reducers/types';
import {updateAuthUser} from 'actions/auth';

import HeaderHOC from 'containers/HeaderHOC';
import Form from 'components/Form';

import styles from './styles';

const getFields = ({defaultEmailValue}) => [
  {
    name: 'email',
    label: 'EMAIL',
    type: 'text',
    options: {
      email: true,
      defaultValue: defaultEmailValue,
    },
  }, {
    name: 'password',
    label: 'NEW PASSWORD',
    type: 'text',
    options: {
      password: true,
      containNumber: true,
      minLength: 6,
    },
  }, {
    name: 'passwordConfirm',
    label: 'CONFIRM NEW PASSWORD',
    type: 'text',
    options: {
      passwordConfirm: true,
    },
  },
];

type Props = {
  // router
  history: any,
  match: {
    params: any,
  },

  // redux
  user: User,
  isUpdating: boolean,
  updateError: string,
  actions: {
    updateAuthUser: any,
  },
};

type State = {
  success: boolean,
};

class UserEdit extends Component {
  props: Props;
  state: State;
  updatedUser: User;

  constructor(props) {
    super(props);
    this.updatedUser = {
      id: '',
      email: '',
      access: -1,
    };
    this.state = {
      success: false,
    };
  }
  componentWillReceiveProps(nextProps: Props) {
    if (isEqual(this.updatedUser, nextProps.user)) {
      this.setState({success: true});
    }
  }

  onSubmit = (values: any) => {
    const nextUser = {...values, passwordConfirm: undefined};
    this.updatedUser = {
      ...this.props.user,
      ...nextUser,
    };
    this.props.actions.updateAuthUser(nextUser);
  }
  render() {
    const fields = getFields({
      defaultEmailValue: this.props.user.email,
    });
    return (
      <div className={css(styles.container)}>
        <span className={css(styles.label)}>
          {this.state.success ? 'Update successful!' : String.fromCharCode(160)}
        </span>
        <div className={css(styles.form)}>
          <Form
            style={{height: '80vh', maxWidth: '50%'}}
            fields={fields}
            submitButtonText={'UPDATE'}
            onSubmit={this.onSubmit}
            label={`EDIT: ${this.props.user.email}`}
            error={this.props.updateError}
            isLoading={this.props.isUpdating}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  auth: {
    user,
    isUpdating,
    updateError,
  },
}: ReduxState) => ({
  user,
  isUpdating,
  updateError,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({updateAuthUser}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHOC(UserEdit));
