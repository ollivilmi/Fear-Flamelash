import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import EventPage from './pages/EventPage';
import PointsPage from './pages/PointsPage';
import ProfilePage from './pages/PointsPage';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { GoCalendar, GoPerson } from "react-icons/go";
import { FaDragon } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

class AppContainer extends Component {
    render() {
        const margin = {margin: "0.25em 0.5em"}

        if (this.props.token) return (
        <>
            <Navbar expand="sm" variant="dark" bg="dark" style={{border: "1px solid #000"}} >
                <Navbar.Brand>
                    <NavLink className="nav" exact to="/events" activeClassName="activeNav">
                        <GoCalendar style={margin} />Calendar
                    </NavLink>
                </Navbar.Brand >
                <Nav.Link>
                    <NavLink className="nav" exact to="/epgp" activeClassName="activeNav">
                        <FaDragon style={margin} />EPGP
                    </NavLink>
                </Nav.Link>
                <Nav.Link>
                    <NavLink className="nav" exact to="/profile" activeClassName="activeNav">
                        <GoPerson style={margin} />Profile
                    </NavLink>
                </Nav.Link>
                <Navbar.Collapse className="justify-content-end">
                    <Nav.Link className="nav" href="/" onClick={() => {localStorage.clear()}}>
                        <IoIosLogOut /> Logout
                    </Nav.Link>
                </Navbar.Collapse>
             </Navbar>
            <Container style={{justifyContent: 'center', marginTop: "2em"}}>
                <Switch>
                    <Route exact path='/events' component={EventPage}/>
                    <Route exact path='/epgp' component={PointsPage}/>
                    <Route exact path='/profile' component={ProfilePage}/>
                </Switch>
            </Container>
        </>
        )

        return <Route exact path="/" component={LoginPage} />
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