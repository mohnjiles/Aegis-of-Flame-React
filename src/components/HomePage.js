import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import { isLoggedIn, getUserData } from '../utils/AuthService';

class HomePage extends Component {

  constructor() {
    super();
    this.state = { userData: {} };
  }

  getUserData() {
    const userData = getUserData();
    this.setState({userData: userData});
  }

  componentDidMount() {
    if (isLoggedIn())
      this.getUserData();
  }

  render() {
    const { userData } = this.state;
    return (
      <div>
        <Nav />
        {
          (isLoggedIn()) ? <h3 className="text-center">Welcome back, {userData.email}!</h3>
          : <h3 className="text-center">Welcome to Aegis of Flame!</h3>
        }

      </div>
    )
  }


}

export default HomePage;
