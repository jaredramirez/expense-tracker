// @flow
import {css} from 'aphrodite';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import type {State, User} from 'reducers/types';
import {createUserWithAuth, fetchUsers} from 'actions/users';

import HeaderHOC from 'containers/HeaderHOC';
import Form from 'components/Form';
import Table from 'components/Table';

import {getAccessLabel} from 'containers/utils';
import styles from './styles';

const getFields = (values: Array<string>) => [
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
    },
  },
];

const style = {textAlign: 'center'};
const columns = [
  {
    header: 'Email',
    accessor: 'email',
    sortable: false,
    style,
  }, {
    header: 'Access',
    accessor: 'access',
    sortable: false,
    style,
    render: row => (<span>{getAccessLabel(row.value)}</span>),
    filterMethod: ({value}, row) => {
      const label = getAccessLabel(row.access);
      return label.toLowerCase().indexOf(value.toLowerCase()) !== -1;
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
  users: Array<User>,
  fetchedFor: string,
  isFetching: boolean,
  actions: {
    createUserWithAuth: any,
    fetchUsers: any,
  },
};

class ExpensesDashboard extends Component {
  props: Props;
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
  }

  componentDidMount() {
    if (this.props.users !== []) {
      this.props.actions.fetchUsers();
    }
  }
  onSubmit = (values: any) => {
    this.props.actions.createUserWithAuth({...values, passwordConfirm: undefined});
  }
  onRowClick = (user: User) => {
    this.props.history.push(`/users/${user.id}`);
  }
  render() {
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.form)}>
          <Form
            style={{height: '80vh'}}
            fields={getFields(this.accessValues)}
            onSubmit={this.onSubmit}
            label={'CREATE USER'}
          />
        </div>
        <div className={css(styles.table)}>
          <Table
            columns={columns}
            data={this.props.users}
            onRowClick={this.onRowClick}
            noDataText={this.props.isFetching ? 'Loading...' : 'No data!'}
            showFilters
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({auth: {user}, users: {users, isFetching}}: State) => ({
  authUser: user,
  users,
  isFetching,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({createUserWithAuth, fetchUsers}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHOC(ExpensesDashboard));
