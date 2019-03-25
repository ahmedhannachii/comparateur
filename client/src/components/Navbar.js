import React, { Fragment } from 'react';
import { NavLink } from "react-router-dom";
import './App.css';
import Signout from '../components/Auth/Signout';


const Navbar = ({ session }) => {

    if (session && session.getCurrentUser && session.getCurrentUser.permission === "ADMIN") {
        return (
            <nav>
                <NavbarAdminAuth session={session} />
            </nav>
        )
    }
    else if (session && session.getCurrentUser && session.getCurrentUser.permission === "USER") {
        return (
            <nav>
                <NavbarAuth session={session} />
            </nav>)
    } else {
        return <NavbarUnAuth />
    }
};

const NavbarAuth = ({ session }) => (
    <Fragment>
        <ul>
            <li>
                <NavLink to="/" exact> Home </NavLink>
            </li>
            <li>
                <NavLink to="/News"> News </NavLink>
            </li>
            <li>
                <NavLink to="/Search"> Search </NavLink>
            </li>
            <li>
                <NavLink to="/Profile"> Profile </NavLink>
            </li>
            <li>
                <NavLink to="/Contact"> Contact Us </NavLink>
            </li>
            <li>
                <Signout />
            </li>
        </ul>
        <h4>Welcom, {session.getCurrentUser.firstName}</h4>
    </Fragment>
);


const NavbarAdminAuth = ({ session }) => (
    <Fragment>
        <ul>
            <li>
                <NavLink to="/" exact> Home </NavLink>
            </li>
            <li>
                <NavLink to="/Profile"> Profile </NavLink>
            </li>
            <li>
                <Signout />
            </li>
        </ul>
        <h3>Welcom, {session.getCurrentUser.firstName}</h3>
    </Fragment>
);


const NavbarUnAuth = () => (
    <ul>
        <li>
            <NavLink to="/" exact> Home </NavLink>
        </li>
        <li>
            <NavLink to="/Search"> Search </NavLink>
        </li>
        <li>
            <NavLink to="/Signup"> Signup </NavLink>
        </li>
        <li>
            <NavLink to="/Signin"> Signin </NavLink>
        </li>
    </ul>
);


export default Navbar;