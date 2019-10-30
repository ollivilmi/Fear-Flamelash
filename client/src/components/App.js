import React, { Component } from 'react';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import AppContainer from './AppContainer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <AppContainer/>
      </Provider>
    );
  }
}
