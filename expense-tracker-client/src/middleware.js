// @flow
import {LOGOUT} from 'actions/auth';

export default (store: any) => (next: any) => (action: any) => {
  const {exp} = store.getState().auth;
  if (
    action.type !== LOGOUT &&
    exp !== -1 &&
    exp < Math.round(new Date().getTime() / 1000)
  ) {
    store.dispatch({type: LOGOUT, payload: 'Session expired, please login again.'});
  }

  return next(action);
};
