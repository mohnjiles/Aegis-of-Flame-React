import React, { Component } from 'react';
import Nav from './Nav';
import { isLoggedIn, getUserData } from '../utils/AuthService';
import DKPTracker from './DKPTracker';
import CurrentGames from './CurrentGames';
import MarshallComponent from './MarshallComponent';
import DiscordWidget from './DiscordWidget';
import { getUsersById } from '../utils/api';
import News from './News';

class HomePage extends Component {

  constructor() {
    super();
    this.state = { userData: {}, user: {} };
  }

  async getUserData() {
    const userData = getUserData();
    const user = await getUsersById(userData.id);
    this.setState({userData: userData, user: user[0]});
  }

  componentDidMount() {
    if (isLoggedIn())
      this.getUserData();
  }

  render() {
    const { userData, user } = this.state;
    return (
      <div>
        <Nav />
        {
          (isLoggedIn()) ? <h3 className="text-center">Welcome back, {user.name}!</h3>
          : <h3 className="text-center">Welcome to Aegis of Flame!</h3>
        }

        <div className="col-md-2 col-sm-3">
          <DKPTracker/>
        </div>
        <div className="col-md-8 col-sm-6">
          <News/>
        </div>
        <div className="col-md-2 col-sm-3">
          <div className="row">
            <DiscordWidget/>
          </div>
          <div className="row">
            <CurrentGames/>
          </div>
        </div>
      </div>

    )
  }


}

export default HomePage;
