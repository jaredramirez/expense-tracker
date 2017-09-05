// @flow
import jwtDecode from 'jwt-decode';

import {
  LOGIN,
  IS_AUTHENTICATING,
  LOGIN_ERROR,
  LOGOUT,
  UPDATE_AUTH_USER,
  UPDATE_AUTH_USER_COMPLETE,
  UPDATE_AUTH_USER_ERROR,
} from 'actions/auth';
import type {PayloadAction} from 'actions/types';

import type {AuthState} from './types';

const initialState: AuthState = {
  isAuthenticating: false,
  isAuthenticed: false,
  error: '',
  jwt: '',
  exp: -1,

  user: {
    id: '',
    email: '',
    access: -1,
  },
  isUpdating: false,
  updateError: '',
};

const actionHandlers = {
  [LOGIN]: (state: AuthState, action: PayloadAction): AuthState => {
    const decoded = jwtDecode(action.payload.token);
    return {
      ...state,
      isAuthenticating: false,
      isAuthenticed: true,
      jwt: action.payload.token,
      exp: decoded.exp,
      user: {
        id: decoded.id,
        email: decoded.email,
        access: decoded.access,
      },
    };
  },
  [IS_AUTHENTICATING]: (state: AuthState): AuthState =>
    ({...state, isAuthenticating: true, error: ''}),
  [LOGIN_ERROR]: (state: AuthState, action: PayloadAction): AuthState =>
    ({...state, isAuthenticating: false, error: action.payload.error}),
  [LOGOUT]: (state: AuthState, {payload}: PayloadAction): AuthState =>
    ({...initialState, error: payload}),
  [UPDATE_AUTH_USER]: (state: AuthState, {payload: {user}}: PayloadAction): AuthState =>
    ({
      ...state,
      user: {...state.user, ...user},
      isUpdatingAuthUser: true,
    }),
  [UPDATE_AUTH_USER_COMPLETE]: (state: AuthState): AuthState =>
    ({
      ...state,
      isUpdatingAuthUser: false,
      updateAuthUserError: '',
    }),
  [UPDATE_AUTH_USER_ERROR]:
    (state: AuthState, {payload: {error, original}}: PayloadAction): AuthState =>
      ({
        ...state,
        user: original,
        isUpdatingAuthUser: false,
        updateAuthUserError: error,
      }),
};

export default (state: AuthState = initialState, action: any) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
};
