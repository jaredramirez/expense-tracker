// @flow
import {
  CREATE_EXPENSE,
  CREATE_EXPENSE_COMPLETE,
  CREATE_EXPENSE_ERROR,
  FETCH_EXPENSES,
  FETCH_EXPENSES_COMPLETE,
  FETCH_EXPENSES_ERROR,
  UPDATE_EXPENSE,
  UPDATE_EXPENSE_COMPLETE,
  UPDATE_EXPENSE_ERROR,
  DELETE_EXPENSE,
  DELETE_EXPENSE_COMPLETE,
  DELETE_EXPENSE_ERROR,
} from 'actions/expenses';
import {LOGOUT} from 'actions/auth';
import type {PayloadAction} from 'actions/types';

import type {ExpensesState} from './types';

const initialState: ExpensesState = {
  isFetching: false,
  expenses: [],
  fetchError: '',
  fetchedFor: '',

  isCreating: false,
  createError: '',
  createSuccessful: false,

  isUpdating: false,
  updateError: '',
  updateSuccessful: false,

  isDeleteing: false,
  deleteError: '',
};

const actionHandlers = {
  [CREATE_EXPENSE]: (state: ExpensesState, {payload}: PayloadAction): ExpensesState => ({
    ...state,
    isCreating: true,
    expenses: [
      ...state.expenses,
      payload,
    ],
  }),
  [CREATE_EXPENSE_COMPLETE]:
    (state: ExpensesState, {payload: {expenseId}}: PayloadAction): ExpensesState => ({
      ...state,
      isCreating: false,
      createError: '',
      expenses: [
        ...state.expenses.slice(0, state.expenses.length - 1),
        {...state.expenses[state.expenses.length - 1], id: expenseId},
      ],
    }),
  [CREATE_EXPENSE_ERROR]:
    (state: ExpensesState, {payload: {error}}: PayloadAction): ExpensesState => ({
      ...state,
      isCreating: false,
      createError: error,
      expenses: [
        ...state.expenses.slice(0, -1),
      ],
    }),
  [FETCH_EXPENSES]: (state: ExpensesState): ExpensesState => ({
    ...state,
    isFetching: true,
  }),
  [FETCH_EXPENSES_COMPLETE]:
    (state: ExpensesState, {payload: {id, expenses}}: PayloadAction): ExpensesState => ({
      ...state,
      isFetching: false,
      fetchError: '',
      fetchedFor: id,
      expenses:
        expenses.map(({_id, ...rest}) => ({...rest, id: _id})),
    }),
  [FETCH_EXPENSES_ERROR]:
    (state: ExpensesState, {payload: {error}}: PayloadAction): ExpensesState => ({
      ...state,
      isFetching: false,
      fetchError: error,
    }),
  [UPDATE_EXPENSE]:
    (state: ExpensesState, {payload: {index, expense}}: any): ExpensesState => ({
      ...state,
      isUpdating: true,
      expenses: state.expenses.map((curExpense, i) =>
        i === index ? {...curExpense, ...expense} : curExpense),
    }),
  [UPDATE_EXPENSE_COMPLETE]: (state: ExpensesState): ExpensesState => ({
    ...state,
    isUpdating: false,
    updateError: '',
  }),
  [UPDATE_EXPENSE_ERROR]:
    (state: ExpensesState, {payload: {index, error, original}}: any): ExpensesState => ({
      ...state,
      isUpdating: false,
      updateError: error,
      expenses: state.expenses.map((curExpense, i) => i === index ? original : curExpense),
    }),
  [DELETE_EXPENSE]:
    (state: ExpensesState, {payload: {index}}: any): ExpensesState => ({
      ...state,
      isDeleteing: true,
      expenses: [
        ...state.expenses.slice(0, index),
        ...state.expenses.slice(index + 1),
      ],
    }),
  [DELETE_EXPENSE_COMPLETE]: (state: ExpensesState): ExpensesState => ({
    ...state,
    isDeleteing: false,
    deleteError: '',
  }),
  [DELETE_EXPENSE_ERROR]:
    (state: ExpensesState, {payload: {error, expenses}}: any): ExpensesState => ({
      ...state,
      isDeleteing: false,
      deleteError: error,
      expenses,
    }),
  [LOGOUT]: () => initialState,
};

export default (state: ExpensesState = initialState, action: any) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
};
