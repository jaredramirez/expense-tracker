// @flow
export type Expense = {
  id: string,
  amount: number,
  description: string,
  comment: string,
  datetime: any,
};

export type ExpensesState = {
  isCreating: boolean,
  createError: string,
  createSuccessful: boolean,

  isFetching: boolean,
  expenses: Array<Expense>,
  fetchError: string,
  fetchedFor: string,

  isUpdating: boolean,
  updateError: string,
  updateSuccessful: boolean,

  isDeleteing: boolean,
  deleteError: string,
};

export type User = {
  id: string,
  email: string,
  access: number,
};

export type UsersState = {
  isCreating: boolean,
  createError: string,
  createSuccessful: boolean,

  isFetching: boolean,
  users: Array<User>,
  user: User,
  fetchError: string,
  fetchedFor: string,

  isUpdating: boolean,
  updateError: string,
  updateSuccessful: boolean,

  isDeleteing: boolean,
  deleteError: string,
  deleteSuccessful: boolean,
};

export type AuthState = {
  isAuthenticating: boolean,
  isAuthenticed: boolean,
  error: string,
  jwt: string,
  exp: number,

  user: User,
  isUpdating: boolean,
  updateError: string,
};

export type State = {
  auth: AuthState,
  users: UsersState,
  expenses: ExpensesState,
};

