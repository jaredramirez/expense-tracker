// @flow
import type {State, User} from 'reducers/types';

import {getHeader, getAuthHeader, toJSON} from './utils';

export const CREATE_RESET = 'users/CREATE_RESET';
export const CREATE_USER = 'users/CREATE_USER';
export const CREATE_USER_COMPLETE = 'users/CREATE_USER_COMPLETE';
export const CREATE_USER_ERROR = 'users/CREATE_USER_ERROR';
export const CREATE_USER_AUTH = 'users/CREATE_USER_AUTH';
export const CREATE_USER_AUTH_COMPLETE = 'users/CREATE_USER_AUTH_COMPLETE';
export const CREATE_USER_AUTH_ERROR = 'users/CREATE_USER_AUTH_ERROR';
export const FETCH_USERS = 'users/FETCH_USERS';
export const FETCH_USERS_COMPLETE = 'users/FETCH_USERS_COMPLETE';
export const FETCH_USERS_ERROR = 'users/FETCH_USERS_ERROR';
export const FETCH_USER = 'users/FETCH_USER';
export const FETCH_USER_COMPLETE = 'users/FETCH_USER_COMPLETE';
export const FETCH_USER_ERROR = 'users/FETCH_USER_ERROR';
export const UPDATE_RESET = 'users/UPDATE_RESET';
export const UPDATE_USER = 'users/UPDATE_USER';
export const UPDATE_USER_COMPLETE = 'users/UPDATE_USER_COMPLETE';
export const UPDATE_USER_ERROR = 'users/UPDATE_USER_ERROR';
export const DELETE_RESET = 'users/DELETE_RESET';
export const DELETE_USER = 'users/DELETE_USER';
export const DELETE_USER_COMPLETE = 'users/DELETE_USER_COMPLETE';
export const DELETE_USER_ERROR = 'users/DELETE_USER_ERROR';

export const createReset = () => ({
  type: CREATE_RESET,
});

export const createUser = (payload: any) =>
  async (dispatch: any) => {
    dispatch({type: CREATE_USER});
    try {
      const response = await fetch('http://104.154.191.169:2000/users', {
        method: 'POST',
        headers: getHeader(),
        body: toJSON({...payload, email: payload.email.toLowerCase()}),
      });

      if (response.status !== 201) {
        let error = 'Error signing up. Please try again.';
        if (response.status === 409) {
          error = 'Email already in use.';
        }
        dispatch({type: CREATE_USER_ERROR, payload: {error}});
      } else {
        dispatch({type: CREATE_USER_COMPLETE});
      }
    } catch (e) {
      dispatch({type: CREATE_USER_ERROR, payload: {error: e.message}});
    }
  };

export const createUserWithAuth = (payload: any) =>
  async (dispatch: any, getState: () => State) => {
    dispatch({type: CREATE_USER_AUTH, payload});
    try {
      const {auth: {jwt}} = getState();
      const response = await fetch(
        'http://104.154.191.169:2000/users/authorized',
        {
          method: 'POST',
          headers: getAuthHeader(jwt),
          body: toJSON({...payload, email: payload.email.toLowerCase()}),
        },
      );

      if (response.status !== 201) {
        dispatch({type: CREATE_USER_AUTH_ERROR,
          payload: {
            error: 'Error creating user. Please try again.',
          },
        });
      } else {
        const json = await response.json();
        dispatch({type: CREATE_USER_AUTH_COMPLETE, payload: {userId: json.id}});
      }
    } catch (e) {
      dispatch({type: CREATE_USER_AUTH_ERROR, payload: {error: e.message}});
    }
  };

export const fetchUsers = () =>
  async (dispatch: any, getState: () => State) => {
    dispatch({type: FETCH_USERS});
    try {
      const {auth: {jwt}} = getState();
      const response = await fetch(
        'http://104.154.191.169:2000/users',
        {
          method: 'GET',
          headers: getAuthHeader(jwt),
        },
      );

      if (response.status !== 200) {
        dispatch({type: FETCH_USERS_ERROR,
          payload: {
            error: 'Error fetching users. Please try again.',
          },
        });
      } else {
        const users = await response.json();
        dispatch({type: FETCH_USERS_COMPLETE, payload: {users}});
      }
    } catch (e) {
      dispatch({type: FETCH_USERS_ERROR, payload: {error: e.message}});
    }
  };

export const fetchUser = (id: string) =>
  async (dispatch: any, getState: () => State) => {
    dispatch({type: FETCH_USER});
    try {
      const {auth: {jwt}} = getState();
      const response = await fetch(
        `http://104.154.191.169:2000/users/${id}`,
        {
          method: 'GET',
          headers: getAuthHeader(jwt),
        },
      );

      if (response.status !== 200) {
        dispatch({type: FETCH_USER_ERROR,
          payload: {
            error: 'Error fetching user. Please try again.',
          },
        });
      } else {
        const user = await response.json();
        dispatch({type: FETCH_USER_COMPLETE, payload: {user, id}});
      }
    } catch (e) {
      dispatch({type: FETCH_USER_ERROR, payload: {error: e.message}});
    }
  };

export const updateReset = () => ({
  type: UPDATE_RESET,
});

export const updateUser = (userId: string, payload: any) =>
  async (dispatch: any, getState: () => State) => {
    const {auth: {jwt}, users: {users}} = getState();
    const index = users.map((curUser: User) => curUser.id).indexOf(userId);
    const original = users[index];
    dispatch({
      type: UPDATE_USER,
      payload: {
        index,
        user: payload,
      },
    });
    try {
      const response = await fetch(`http://104.154.191.169:2000/users/${userId}`, {
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
        dispatch({type: UPDATE_USER_ERROR, payload: {error, index, original}});
      } else {
        dispatch({type: UPDATE_USER_COMPLETE});
      }
    } catch (e) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: {
          error: e.message,
          index,
          original,
        },
      });
    }
  };

export const deleteReset = () => ({type: DELETE_RESET});

export const deleteUser = (userId: string) =>
  async (dispatch: any, getState: () => State) => {
    const {auth: {jwt}, users: {users}} = getState();
    const index = users.map((curUser: User) => curUser.id).indexOf(userId);
    dispatch({type: DELETE_USER, payload: {index}});
    try {
      const response = await fetch(
        `http://104.154.191.169:2000/users/${userId}`,
        {
          method: 'DELETE',
          headers: getAuthHeader(jwt),
        },
      );

      if (response.status !== 200) {
        dispatch({type: DELETE_USER_ERROR,
          payload: {
            error: 'Error deleting user. Please try again.',
            users,
          },
        });
      } else {
        dispatch({type: DELETE_USER_COMPLETE});
      }
    } catch (e) {
      dispatch({type: DELETE_USER_ERROR, payload: {error: e.message, users}});
    }
  };
