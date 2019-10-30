import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { GoCalendar, GoPerson } from "react-icons/go";
import { FaDragon } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

import { NavLink } from 'react-router-dom';

export default function NavigationBar() {

    const margin = {margin: "0.25em 0.5em"}

    return (
        <Navbar expand="sm" variant="dark" bg="dark" style={{border: "1px solid #000", marginBottom: "2.5em"}} >
            <Navbar.Brand>
                <NavLink className="nav" exact to="/events" activeClassName="activeNav">
                    <GoCalendar style={margin} />Events
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
    )
}
