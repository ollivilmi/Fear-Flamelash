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
        <Navbar expand="sm" className="navbar">
            <span class="navbar-brand">
                <NavLink className="nav" exact to="/events" activeClassName="activeNav">
                    <GoCalendar style={margin} />Events
                </NavLink>
            </span>
            <div class="nav-link">
                <NavLink className="nav" exact to="/epgp" activeClassName="activeNav">
                    <FaDragon style={margin} />EPGP
                </NavLink>
            </div>
            <div class="nav-link">
                <NavLink className="nav" exact to="/profile" activeClassName="activeNav">
                    <GoPerson style={margin} />Profile
                </NavLink>
            </div>
            <div className="justify-content-end navbar-collapse collapse">
                <Nav.Link className="nav" href="/" onClick={() => {localStorage.clear()}}>
                    <IoIosLogOut /> Logout
                </Nav.Link>
            </div>
        </Navbar>
    )
}
