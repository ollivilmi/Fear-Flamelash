import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import EventPage from './pages/EventPage';
import PointsPage from './pages/PointsPage';
import ProfilePage from './pages/PointsPage';

import Container from 'react-bootstrap/Container';
import {connect} from 'react-redux';


class AppContainer extends Component {
    render() {
        return (
            <Container style={{justifyContent: 'center'}}>
                <Switch>
                    <Route exact path="/" component={LoginPage} />
                    <Route exact path='/events' component={EventPage}/>
                    <Route exact path='/epgp' component={PointsPage}/>
                    <Route exact path='/profile' component={ProfilePage}/>
                </Switch>
            </Container>
        )
    }
}

export default connect()(AppContainer);