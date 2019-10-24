import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/Users';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware)),
);

export default class App extends Component {
  render() {
    const App = () => (
      <Container>
        <Navbar expand="lg" variant="dark" bg="dark" sticky="top" >
          <Navbar.Brand href="/">Fear-Flamelash</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="users">Users</Nav.Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/users' component={List}/>
        </Switch>
      </Container>
    )
    return (
      <Provider store={store}>
        <Switch>
          <App/>
        </Switch>
      </Provider>
    );
  }
}
