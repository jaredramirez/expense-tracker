// @flow
import {css} from 'aphrodite';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import type {State as ReduxState, Expense} from 'reducers/types';
import {updateExpense, deleteExpense} from 'actions/expenses';

import HeaderHOC from 'containers/HeaderHOC';
import Form from 'components/Form';

import styles from './styles';

const getFields = ({
  defaultAmountValue,
  defaultDateTimeValue,
  defaultCommentValue,
  defaultDescriptionValue,
}) => [
  {
    name: 'amount',
    label: 'AMOUNT',
    type: 'text',
    options: {
      required: true,
      onlyNumber: true,
      defaultValue: defaultAmountValue,
    },
  }, {
    name: 'datetime',
    label: 'DATE AND TIME',
    type: 'date',
    options: {
      required: true,
      defaultValue: defaultDateTimeValue,
    },
  }, {
    name: 'comment',
    label: 'COMMENT',
    type: 'text',
    options: {
      required: true,
      defaultValue: defaultCommentValue,
    },
  }, {
    name: 'description',
    label: 'DESCRIPTION',
    type: 'text',
    options: {
      required: true,
      defaultValue: defaultDescriptionValue,
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
  expenses: Array<Expense>,
  isUpdating: boolean,
  updateError: string,
  actions: {
    updateExpense: any,
    deleteExpense: any,
  },
};

type State = {
  expense: Expense,
  success: boolean,
};

class ExpenseEdit extends Component {
  props: Props;
  state: State;

  constructor(props) {
    super(props);
    let expense = this.props.expenses.find(
      curExpense => curExpense.id === this.props.match.params.expenseId,
    );
    if (!expense) {
      expense = {
        id: '',
        amount: -1,
        datetime: -1,
        description: '',
        comment: '',
      };
    }
    this.state = {
      expense,
      success: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    const expense = nextProps.expenses.find(
      curExpense => curExpense.id === this.props.match.params.expenseId,
    );
    if (!expense) {
      this.props.history.goBack();
    } else {
      const success = !(nextProps.updateError.length > 0);
      this.setState({expense, success});
    }
  }
  onCancel = () => {
    this.props.actions.deleteExpense(
      this.props.match.params.userId,
      this.state.expense.id,
    );
  }
  onSubmit = (values: any) => {
    this.props.actions.updateExpense(
      this.props.match.params.userId,
      this.state.expense.id,
      values,
    );
  }
  render() {
    const fields = getFields({
      defaultAmountValue: this.state.expense.amount.toString(),
      defaultDateTimeValue: this.state.expense.datetime,
      defaultCommentValue: this.state.expense.comment,
      defaultDescriptionValue: this.state.expense.description,
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
            label={'EDIT EXPENSE'}
            error={this.props.updateError}
            isLoading={this.props.isUpdating}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({expenses: {
  expenses,
  isUpdating,
  updateError,
}}: ReduxState) => ({
  expenses,
  isUpdating,
  updateError,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({updateExpense, deleteExpense}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHOC(ExpenseEdit));
