import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import EventPage from './pages/EventPage';
import PointsPage from './pages/PointsPage';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class AppContainer extends Component {
    render() {
        console.log(this.props.token);
        console.log(this.props.profile);

        if (this.props.token) return (
        <>
            <Navbar expand="md" variant="dark" bg="dark" >
                <Navbar.Brand>
                    <NavLink className="nav" exact to="/" activeClassName="activeNav">Calendar</NavLink>
                </Navbar.Brand >
                <Nav.Link>
                    <NavLink className="nav" exact to="/epgp" activeClassName="activeNav">EPGP</NavLink>
                </Nav.Link>
                <Navbar.Collapse className="justify-content-end">
                    <Nav.Link className="nav" href="/">Log out</Nav.Link>
                </Navbar.Collapse>
             </Navbar>
            <Container style={{justifyContent: 'center', marginTop: "2em"}}>
                <Switch>
                    <Route exact path='/' component={EventPage}/>
                    <Route path='/epgp' component={PointsPage}/>
                </Switch>
            </Container>
        </>
        )

        return <LoginPage />
    }
}

AppContainer.propTypes = {
    token: PropTypes.string,
    profile: PropTypes.object
}
  
const mapStateToProps = state => ({
    token: state.user.token,
    profile: state.user.profile
});

export default connect(mapStateToProps)(AppContainer);