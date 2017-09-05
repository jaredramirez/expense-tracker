// @flow
import {css} from 'aphrodite';
import {groupBy} from 'lodash';
import moment from 'moment';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import type {State as ReduxState, User, Expense} from 'reducers/types';
import HeaderHOC from 'containers/HeaderHOC';
import Form from 'components/Form';

import styles from './styles';

const getFields = (values: Array<any>) => [{
  name: 'week',
  label: 'WEEK STARTING AT',
  type: 'select',
  values,
  options: {
    required: true,
  },
}];

type Props = {
  // router
  history: any,
  match: {
    params: {
      userId: string,
    },
  },

  // redux
  expenses: Array<Expense>,
  users: Array<User>,
};

type State = {
  weeks: any,
  weeksOptions: any,
};


class ExpensesPrint extends Component {
  props: Props;
  state: State;

  constructor(props) {
    super(props);
    const weeks = groupBy(props.expenses,
      (expense: Expense) => moment(expense.datetime).startOf('isoWeek'),
    );
    const weeksOptions = Object.keys(weeks).reduce((acc, key) => ([
      ...acc,
      {value: key, label: key.substring(0, 15)},
    ]), []);
    this.state = {
      weeks,
      weeksOptions,
    };
  }
  onSubmit = ({week}: {week: string}) => {
    this.props.history.push('form/page', {
      weekString: week.substring(0, 15),
      weeks: this.state.weeks[week],
    });
  };
  getLabel = () => {
    const user = this.props.users.find(
      curUser => curUser.id === this.props.match.params.userId,
    );
    return user ? `PRINT EXPENSES FOR: ${user.email}` : 'PRINT EXPENSES';
  };
  render() {
    return (
      <div className={css(styles.container)}>
        <Form
          style={{height: '55vh', maxWidth: '50%'}}
          fields={getFields(this.state.weeksOptions)}
          onSubmit={this.onSubmit}
          label={this.getLabel()}
        />
      </div>
    );
  }
}

const mapStateToProps = ({expenses: {expenses}, users: {users}}: ReduxState) => ({
  expenses,
  users,
});

export default connect(mapStateToProps)(HeaderHOC(ExpensesPrint));
