// @flow
import type {State, Expense} from 'reducers/types';

import {getAuthHeader, toJSON} from './utils';

export const CREATE_EXPENSE = 'expenses/CREATE_EXPENSE';
export const CREATE_EXPENSE_COMPLETE = 'expenses/CREATE_EXPENSE_COMPLETE';
export const CREATE_EXPENSE_ERROR = 'expenses/CREATE_EXPENSE_ERROR';
export const FETCH_EXPENSES = 'expenses/FETCH_EXPENSES';
export const FETCH_EXPENSES_COMPLETE = 'expenses/FETCH_EXPENSES_COMPLETE';
export const FETCH_EXPENSES_ERROR = 'expenses/FETCH_EXPENSES_ERROR';
export const UPDATE_EXPENSE = 'expenses/UPDATE_EXPENSE';
export const UPDATE_EXPENSE_COMPLETE = 'expenses/UPDATE_EXPENSE_COMPLETE';
export const UPDATE_EXPENSE_ERROR = 'expenses/UPDATE_EXPENSE_ERROR';
export const DELETE_EXPENSE = 'expenses/DELETE_EXPENSE';
export const DELETE_EXPENSE_COMPLETE = 'expenses/DELETE_EXPENSE_COMPLETE';
export const DELETE_EXPENSE_ERROR = 'expenses/DELETE_EXPENSE_ERROR';

export const createExpense = (id: string, payload: any) =>
  async (dispatch: any, getState: () => State) => {
    dispatch({type: CREATE_EXPENSE, payload});
    try {
      const {auth: {jwt}} = getState();
      const response = await fetch(
        `http://104.154.191.169:2000/users/${id}/expenses`,
        {
          method: 'POST',
          headers: getAuthHeader(jwt),
          body: toJSON(payload),
        },
      );

      if (response.status !== 201) {
        dispatch({type: CREATE_EXPENSE_ERROR,
          payload: {
            error: 'Error creating expense. Please try again.',
          },
        });
      } else {
        const json = await response.json();
        dispatch({type: CREATE_EXPENSE_COMPLETE, payload: {expenseId: json.id}});
      }
    } catch (e) {
      dispatch({type: CREATE_EXPENSE_ERROR, payload: {error: e.message}});
    }
  };

export const fetchExpenses = (userId: string) =>
  async (dispatch: any, getState: () => State) => {
    dispatch({type: FETCH_EXPENSES});
    try {
      const {auth: {jwt}} = getState();
      const response = await fetch(
        `http://104.154.191.169:2000/users/${userId}/expenses`,
        {
          method: 'GET',
          headers: getAuthHeader(jwt),
        },
      );

      if (response.status !== 200) {
        dispatch({type: FETCH_EXPENSES_ERROR,
          payload: {
            error: 'Error fetching expenses. Please try again.',
          },
        });
      } else {
        const expenses = await response.json();
        dispatch({type: FETCH_EXPENSES_COMPLETE, payload: {expenses, id: userId}});
      }
    } catch (e) {
      dispatch({type: FETCH_EXPENSES_ERROR, payload: {error: e.message}});
    }
  };

export const updateExpense = (userId: string, expenseId: string, expense: any) =>
  async (dispatch: any, getState: () => State) => {
    const {auth: {jwt}, expenses: {expenses}} = getState();
    const index = expenses.map((curExpense: Expense) => curExpense.id).indexOf(expenseId);
    const original = expenses[index];
    dispatch({
      type: UPDATE_EXPENSE,
      payload: {
        index,
        expense,
      },
    });
    try {
      const response = await fetch(
        `http://104.154.191.169:2000/users/${userId}/expenses/${expenseId}`,
        {
          method: 'PUT',
          headers: getAuthHeader(jwt),
          body: toJSON(expense),
        },
      );

      if (response.status !== 200) {
        let error = 'Error updating expense. Please try again.';
        if (response.status === 400) {
          error = 'Invalid payload.';
        } else if (response.status === 404) {
          error = 'User not found.';
        }
        dispatch({type: UPDATE_EXPENSE_ERROR, payload: {error, index, original}});
      } else {
        dispatch({type: UPDATE_EXPENSE_COMPLETE});
      }
    } catch (e) {
      dispatch({
        type: UPDATE_EXPENSE_ERROR,
        payload: {
          error: e.message,
          index,
          original,
        },
      });
    }
  };

export const deleteExpense = (userId: string, expenseId: string) =>
  async (dispatch: any, getState: () => State) => {
    const {auth: {jwt}, expenses: {expenses}} = getState();
    const index = expenses.map((curExpense: Expense) => curExpense.id).indexOf(expenseId);
    dispatch({type: DELETE_EXPENSE, payload: {index}});
    try {
      const response = await fetch(
        `http://104.154.191.169:2000/users/${userId}/expenses/${expenseId}`,
        {
          method: 'DELETE',
          headers: getAuthHeader(jwt),
        },
      );

      if (response.status !== 200) {
        dispatch({type: DELETE_EXPENSE_ERROR,
          payload: {
            error: 'Error deleting expense. Please try again.',
            expenses,
          },
        });
      } else {
        dispatch({type: DELETE_EXPENSE_COMPLETE});
      }
    } catch (e) {
      dispatch({type: DELETE_EXPENSE_ERROR, payload: {error: e.message, expenses}});
    }
  };
