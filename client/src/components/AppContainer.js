import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { FaSkull } from "react-icons/fa"

import LoginPage from './pages/LoginPage';
import EventPage from './pages/EventPage';
import PointsPage from './pages/PointsPage';
import ProfilePage from './pages/ProfilePage';

import Container from 'react-bootstrap/Container';
import {connect} from 'react-redux';


class AppContainer extends Component {
    render() {
        return (
            <div style={{justifyContent: 'center'}}>
                <h1 className="header">Fear-Flamelash <FaSkull/></h1>
                <Container>
                    <Switch>
                        <Route exact path="/" component={LoginPage} />
                        <Route exact path='/events' component={EventPage}/>
                        <Route exact path='/epgp' component={PointsPage}/>
                        <Route exact path='/profile' component={ProfilePage}/>
                    </Switch>
                </Container>
            </div>
        )
    }
}

export default connect()(AppContainer);