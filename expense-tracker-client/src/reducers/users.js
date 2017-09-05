// @flow
import {
  CREATE_RESET,
  CREATE_USER,
  CREATE_USER_COMPLETE,
  CREATE_USER_ERROR,
  CREATE_USER_AUTH,
  CREATE_USER_AUTH_COMPLETE,
  CREATE_USER_AUTH_ERROR,
  FETCH_USERS,
  FETCH_USERS_COMPLETE,
  FETCH_USERS_ERROR,
  FETCH_USER,
  FETCH_USER_COMPLETE,
  FETCH_USER_ERROR,
  UPDATE_USER,
  UPDATE_USER_COMPLETE,
  UPDATE_USER_ERROR,
  DELETE_USER,
  DELETE_RESET,
  DELETE_USER_COMPLETE,
  DELETE_USER_ERROR,
} from 'actions/users';
import {LOGOUT} from 'actions/auth';
import type {PayloadAction} from 'actions/types';

import type {UsersState} from './types';

const initialState: UsersState = {
  isFetching: false,
  users: [],
  user: {
    id: '',
    email: '',
    access: -1,
  },
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
  deleteSuccessful: false,
};

const actionHandlers = {
  [CREATE_RESET]: (state: UsersState): UsersState => ({...state, createSuccessful: false}),
  [CREATE_USER]: (state: UsersState): UsersState => ({
    ...state,
    isCreating: true,
  }),
  [CREATE_USER_COMPLETE]: (state: UsersState): UsersState => ({
    ...state,
    isCreating: false,
    createError: '',
    createSuccessful: true,
  }),
  [CREATE_USER_ERROR]:
    (state: UsersState, {payload: {error}}: PayloadAction): UsersState => ({
      ...state,
      isCreating: false,
      createError: error,
    }),
  [CREATE_USER_AUTH]: (state: UsersState, {payload}: PayloadAction): UsersState => ({
    ...state,
    isCreating: true,
    users: [
      ...state.users,
      payload,
    ],
  }),
  [CREATE_USER_AUTH_COMPLETE]:
    (state: UsersState, {payload: {userId}}: PayloadAction): UsersState => ({
      ...state,
      isCreating: false,
      createError: '',
      users: [
        ...state.users.slice(0, state.users.length - 1),
        {...state.users[state.users.length - 1], id: userId},
      ],
    }),
  [CREATE_USER_AUTH_ERROR]:
    (state: UsersState, {payload: {error}}: PayloadAction): UsersState => ({
      ...state,
      isCreating: false,
      createError: error,
      users: [
        ...state.users.slice(0, -1),
      ],
    }),
  [FETCH_USER]: (state: UsersState): UsersState => ({
    ...state,
    isFetching: true,
  }),
  [FETCH_USERS]: (state: UsersState): UsersState => ({
    ...state,
    isFetching: true,
  }),
  [FETCH_USERS_COMPLETE]:
    (state: UsersState, {payload: {id, users}}: PayloadAction): UsersState => ({
      ...state,
      isFetching: false,
      fetchError: '',
      fetchedFor: id,
      users:
        users.map(({_id, ...rest}) => ({...rest, id: _id})),
    }),
  [FETCH_USERS_ERROR]:
    (state: UsersState, {payload: {error}}: PayloadAction): UsersState => ({
      ...state,
      isFetching: false,
      fetchError: error,
    }),
  [FETCH_USER_COMPLETE]:
    (state: UsersState, {payload: {id, user}}: PayloadAction): UsersState => ({
      ...state,
      isFetching: false,
      fetchError: '',
      fetchedFor: id,
      user,
    }),
  [FETCH_USER_ERROR]:
    (state: UsersState, {payload: {error}}: PayloadAction): UsersState => ({
      ...state,
      isFetching: false,
      fetchError: error,
      user: initialState.user,
    }),
  [UPDATE_USER]:
    (state: UsersState, {payload: {index, user}}: any): UsersState => ({
      ...state,
      isUpdating: true,
      users: state.users.map((curUser, i) =>
        i === index ? {...curUser, ...user} : curUser),
    }),
  [UPDATE_USER_COMPLETE]: (state: UsersState): UsersState => ({
    ...state,
    isUpdating: false,
    updateError: '',
  }),
  [UPDATE_USER_ERROR]:
    (state: UsersState, {payload: {index, error, original}}: any): UsersState => ({
      ...state,
      isUpdating: false,
      updateError: error,
      users: state.users.map((curUser, i) => i === index ? original : curUser),
    }),
  [DELETE_RESET]: (state: UsersState) => ({
    ...state,
    isDeleteing: false,
    deleteError: '',
    deleteSuccessful: false,
  }),
  [DELETE_USER]:
    (state: UsersState, {payload: {index}}: any): UsersState => ({
      ...state,
      isDeleteing: true,
      users: [
        ...state.users.slice(0, index),
        ...state.users.slice(index + 1),
      ],
    }),
  [DELETE_USER_COMPLETE]: (state: UsersState): UsersState => ({
    ...state,
    isDeleteing: false,
    deleteSuccessful: true,
    deleteError: '',
  }),
  [DELETE_USER_ERROR]:
    (state: UsersState, {payload: {error, users}}: any): UsersState => ({
      ...state,
      isDeleteing: false,
      deleteError: error,
      users,
    }),
  [LOGOUT]: () => initialState,
};

export default (state: UsersState = initialState, action: any) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
};
