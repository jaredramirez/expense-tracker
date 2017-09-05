// @flow
import {css} from 'aphrodite';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {bindActionCreators} from 'redux';

import type {State, Expense} from 'reducers/types';
import {createExpense, fetchExpenses} from 'actions/expenses';

import HeaderHOC from 'containers/HeaderHOC';
import Form from 'components/Form';
import Table from 'components/Table';

import styles from './styles';

const fields = [
  {
    name: 'amount',
    label: 'AMOUNT',
    type: 'text',
    options: {
      required: true,
      onlyNumber: true,
    },
  }, {
    name: 'datetime',
    label: 'DATE AND TIME',
    type: 'date',
    options: {
      required: true,
    },
  }, {
    name: 'comment',
    label: 'COMMENT',
    type: 'text',
    options: {
      required: true,
    },
  }, {
    name: 'description',
    label: 'DESCRIPTION',
    type: 'text',
    options: {
      required: true,
    },
  },
];

const style = {textAlign: 'center'};
const columns = [
  {
    header: 'Amount',
    accessor: 'amount',
    sortable: false,
    render: row => (<span>${row.value}</span>),
    style,
  }, {
    header: 'Comment',
    accessor: 'comment',
    sortable: false,
    style,
  }, {
    header: 'Date',
    accessor: 'date',
    sortable: false,
    style,
  }, {
    header: 'Time',
    accessor: 'time',
    sortable: false,
    style,
  }, {
    header: 'Description',
    accessor: 'description',
    sortable: false,
    style,
  },
];

type Props = {
  // router
  history: any,
  match: {
    params: any,
  },

  // redux
  expenses: Array<Expense>,
  fetchedFor: string,
  isFetching: boolean,
  actions: {
    createExpense: any,
    fetchExpenses: any,
  },
};

class ExpensesDashboard extends Component {
  props: Props;

  componentDidMount() {
    if (this.props.fetchedFor !== this.props.match.params.userId) {
      this.props.actions.fetchExpenses(this.props.match.params.userId);
    }
  }
  transformData = (): Array<Expense> => this.props.expenses.map((expense) => {
    const date = new Date(expense.datetime);
    return {
      ...expense,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  });
  onSubmit = (values: Array<string>) => {
    this.props.actions.createExpense(this.props.match.params.userId, values);
  }
  onRowClick = (expense: Expense) => {
    this.props.history.push(
      `/users/${this.props.match.params.userId}/expenses/${expense.id}`,
    );
  }
  render() {
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.form)}>
          <Form
            style={{height: '80vh'}}
            fields={fields}
            onSubmit={this.onSubmit}
            label={'CREATE EXPENSE'}
          />
          <NavLink
            to={`/users/${this.props.match.params.userId}/expenses/print/form`}
            className={css(styles.link)}
            activeClassName={css(styles.linkActive)}
          >
            <span>Print Expenses</span>
          </NavLink>
        </div>
        <div className={css(styles.table)}>
          <Table
            columns={columns}
            data={this.transformData()}
            onRowClick={this.onRowClick}
            noDataText={this.props.isFetching ? 'Loading...' : 'No data!'}
            showFilters
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({expenses: {fetchedFor, expenses, isFetching}}: State) => ({
  expenses,
  fetchedFor,
  isFetching,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({createExpense, fetchExpenses}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHOC(ExpensesDashboard));
