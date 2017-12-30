import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login, logout, isLoggedIn, getUserData } from '../utils/AuthService';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import '../App.css';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Aegis of Flame</Link>
        </div>
        <ul className="nav navbar-nav">
          {
            ( isLoggedIn() ) ? <li><Link to="/special">Member Area</Link></li> : ''
          }
        </ul>
        {
          ( isLoggedIn() ) ? (
            <ul className="nav navbar-nav navbar-right">
              <DropdownButton className="log dropdown" id="dropdown-btn-menu" bsStyle="default" title={getUserData().email}>
                 <MenuItem key="1">Profile</MenuItem>
                 <MenuItem key="2" onClick={() => logout()}>Logout</MenuItem>
               </DropdownButton>
            </ul>
          ) : (
            <ul className="nav navbar-nav navbar-right">
              <li><button className="btn btn-info log" onClick={() => login()}>Log In</button></li>
            </ul>
          )
        }

      </nav>
    )
  }
}

export default Nav;
6
