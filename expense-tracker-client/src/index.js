// @flow
import localForage from 'localforage';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';

import Router from './router';
import store from './store';

type State = {
  rehydrated: boolean,
};

class AppProvider extends Component {
  state: State;
  constructor() {
    super();
    this.state = {rehydrated: false};
  }
  componentWillMount() {
    persistStore(store, {storage: localForage}, () => {
      this.setState({rehydrated: true});
    });
  }
  render() {
    if (!this.state.rehydrated) {
      return <div>Loading...</div>;
    }
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

ReactDOM.render(
  <AppProvider />,
  document.getElementById('root'),
);
