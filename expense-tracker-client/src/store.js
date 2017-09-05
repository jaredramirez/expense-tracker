// @flow
import {compose, combineReducers, applyMiddleware, createStore} from 'redux';
import {autoRehydrate} from 'redux-persist';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import checkToken from './middleware';
import reducers from './reducers';

let middleware = {};
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middleware = applyMiddleware(logger, thunk, checkToken);
} else {
  middleware = applyMiddleware(thunk, checkToken);
}

const config = compose(middleware, autoRehydrate());
const app = combineReducers(reducers);
const store = createStore(app, undefined, config);

export default store;
