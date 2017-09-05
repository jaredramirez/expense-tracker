// @flow
import type {State} from 'reducers/types';

import {getHeader, getAuthHeader, toJSON} from './utils';

export const LOGIN = 'auth/LOGIN';
export const IS_AUTHENTICATING = 'auth/IS_AUTHENTICATING';
export const LOGIN_ERROR = 'auth/LOGIN_ERROR';
export const LOGOUT = 'auth/LOGOUT';
export const UPDATE_AUTH_USER = 'auth/UPDATE_AUTH_USER';
export const UPDATE_AUTH_USER_COMPLETE = 'auth/UPDATE_AUTH_USER_COMPLETE';
export const UPDATE_AUTH_USER_ERROR = 'auth/UPDATE_AUTH_USER_ERROR';

export const login = (payload: any) =>
  async (dispatch: any) => {
    dispatch({type: IS_AUTHENTICATING, payload: true});
    try {
      const response = await fetch('http://104.154.191.169:2000/authenticate', {
        method: 'POST',
        headers: getHeader(),
        body: toJSON({...payload, email: payload.email.toLowerCase()}),
      });

      const responsePayload = await response.json();
      if (response.status !== 200) {
        let error = 'Error logging in. Please try again.';
        if (response.status === 404) {
          error = 'Email not found';
        } else if (response.status === 401) {
          error = 'Invalid password.';
        }
        dispatch({type: LOGIN_ERROR, payload: {error}});
      } else {
        dispatch({type: LOGIN, payload: responsePayload});
      }
    } catch (e) {
      dispatch({type: LOGIN_ERROR, payload: {error: e.message}});
    }
  };

export const logout = () => ({
  type: LOGOUT,
});

export const updateAuthUser = (payload: any) =>
  async (dispatch: any, getState: () => State) => {
    const {auth: {user, jwt}} = getState();
    dispatch({type: UPDATE_AUTH_USER, payload: {user: payload}});
    try {
      const response = await fetch(`http://104.154.191.169:2000/users/${user.id}`, {
        method: 'PUT',
        headers: getAuthHeader(jwt),
        body: toJSON(payload),
      });

      if (response.status !== 200) {
        let error = 'Error updating user. Please try again.';
        if (response.status === 401) {
          error = 'Unauthorized request.';
        } else if (response.status === 404) {
          error = 'User not found.';
        }
        dispatch({type: UPDATE_AUTH_USER_ERROR, payload: {error, original: user}});
      } else {
        dispatch({type: UPDATE_AUTH_USER_COMPLETE, payload: {user: payload}});
      }
    } catch (e) {
      dispatch({
        type: UPDATE_AUTH_USER_ERROR,
        payload: {error: e.message, original: user},
      });
    }
  };
