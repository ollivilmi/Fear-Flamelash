import React, { Component } from 'react';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import AppContainer from './AppContainer';

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware)),
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
