// @flow
import {css} from 'aphrodite';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import type {State as ReduxState, User} from 'reducers/types';
import {updateUser, deleteUser, deleteReset} from 'actions/users';

import HeaderHOC from 'containers/HeaderHOC';
import Form from 'components/Form';

import styles from './styles';

const getFields = ({
  defaultEmailValue,
  defaultAccessValue,
  values,
}) => [
  {
    name: 'email',
    label: 'EMAIL',
    type: 'text',
    options: {
      required: true,
      email: true,
      defaultValue: defaultEmailValue,
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
    label: 'CONFIRM PASSWORD',
    type: 'text',
    options: {
      required: true,
      passwordConfirm: true,
    },
  }, {
    name: 'access',
    label: 'ACCESS LEVEL',
    type: 'select',
    values,
    options: {
      required: true,
      defaultValue: defaultAccessValue,
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
  authUser: User,
  user: User,
  users: Array<User>,
  isUpdating: boolean,
  updateError: string,
  deleteSuccessful: boolean,
  actions: {
    updateUser: any,
    deleteUser: any,
    deleteReset: any,
  },
};

type State = {
  user: User,
  success: boolean,
};

class UserEdit extends Component {
  props: Props;
  state: State;
  accessValues: Array<any>;

  constructor(props) {
    super(props);
    this.accessValues = [];
    for (let i = 0; i <= this.props.authUser.access; i += 1) {
      let label = '';
      if (i === 0) {
        label = 'Regular';
      } else if (i === 1) {
        label = 'Manager';
      } else if (i === 2) {
        label = 'Admin';
      }
      this.accessValues.push({
        value: i,
        label,
      });
    }

    let user = this.props.users.find(
      curUser => curUser.id === this.props.match.params.userId,
    );
    if (!user) {
      user = {
        id: '',
        email: '',
        access: -1,
      };
    }
    this.state = {
      user,
      success: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.deleteSuccessful) {
      this.props.actions.deleteReset();
      this.props.history.goBack();
    }

    const user = nextProps.users.find(
      curUser => curUser.id === this.props.match.params.userId,
    );
    if (user) {
      const success = !(nextProps.updateError.length > 0);
      this.setState({user, success});
    }
  }
  onLabelAction = () => {
    this.props.history.push(`/users/${this.props.match.params.userId}/expenses`);
  }
  onCancel = () => {
    this.props.actions.deleteUser(
      this.props.match.params.userId,
    );
  }
  onSubmit = (values: any) => {
    const payload = values;
    delete payload.passwordConfirm;
    this.props.actions.updateUser(
      this.props.match.params.userId,
      payload,
    );
  }
  render() {
    const fields = getFields({
      defaultEmailValue: this.state.user.email,
      defaultAccessValue: this.state.user.access,
      values: this.accessValues,
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
            showCancel
            cancelButtonText={'DELETE'}
            onCancel={this.onCancel}
            label={`EDIT USER: ${this.state.user.email}`}
            showLabelAction={
              this.props.authUser.access > 1 &&
              this.props.authUser.id !== this.props.match.params.userId
            }
            labelActionText={'EXPENSES'}
            onLabelAction={this.onLabelAction}
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
  },
  users: {
    users,
    isUpdating,
    updateError,
    deleteSuccessful,
  },
}: ReduxState) => ({
  authUser: user,
  users,
  isUpdating,
  updateError,
  deleteSuccessful,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({updateUser, deleteUser, deleteReset}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHOC(UserEdit));
