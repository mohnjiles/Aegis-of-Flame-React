import React, { Component } from 'react';
import Nav from './Nav';
import { isLoggedIn, getUserData } from '../utils/AuthService';
import DKPTracker from './DKPTracker';
import CurrentGames from './CurrentGames';

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

        <div className="col-md-2 col-sm-3">
          <DKPTracker/>
        </div>
        <div className="col-md-8 col-sm-9">

        </div>
        <div className="col-md-2 col-sm-3">
          <CurrentGames/>
        </div>

      </div>
    )
  }


}

export default HomePage;
