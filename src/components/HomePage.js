import React, { Component } from 'react';
import Nav from './Nav';
import { isLoggedIn, getUserData } from '../utils/AuthService';
import DKPTracker from './DKPTracker';
import CurrentGames from './CurrentGames';
import DiscordWidget from './DiscordWidget';
import { getUsersById } from '../utils/api';
import News from './News';
import Events from './Events';

class HomePage extends Component {

  constructor() {
    super();
    this.state = { userData: {}, user: {} };
    this.onLayoutChange.bind(this);
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

  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    //saveToLS("layouts", layouts);
    this.setState({ layouts });
  }

  render() {

    const { user } = this.state;
    return (
      <div>
        <Nav />
        {
          (isLoggedIn()) ? <h3 className="text-center">Welcome back, {user.name}!</h3>
          : <h3 className="text-center">Welcome to Aegis of Flame!</h3>
        }
          <div className="col-md-3 col-sm-3" key="a" data-grid={{ w: 2, h: 13, x: 0, y: 0, minW: 2, minH: 13, maxH: 13 }}>
            <div className="row">
              <Events/>
            </div>
            <div className="row">
              <DKPTracker/>
            </div>
           </div>
          <div className="col-md-6" key="b" data-grid={{ w: 5, h: 25, x: 2, y: 0, minW: 3, minH: 1, maxH: 25 }}>
            <News/>
          </div>
          <div className="col-md-3" key="d" data-grid={{ w: 2, h: 9, x: 10, y: 0, minW: 2, minH: 10, maxH: 17 }}>
            <div className="row">
              <DiscordWidget/>
            </div>
            <div className="row">
              <CurrentGames/>
            </div>
          </div>
        {/* </AlertProvider> */}
      </div>
    )
  }
}

export default HomePage;