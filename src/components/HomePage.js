import React, { Component } from 'react';
import Nav from './Nav';
import { isLoggedIn, getUserData } from '../utils/AuthService';
import DKPTracker from './DKPTracker';
import CurrentGames from './CurrentGames';
import MarshallComponent from './MarshallComponent';
import DiscordWidget from './DiscordWidget';
import { getUsersById } from '../utils/api';
import News from './News';
import Events from './Events';
import {Responsive, WidthProvider} from 'react-grid-layout';
import ReactGridLayout from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

class HomePage extends Component {

  constructor() {
    super();
    this.state = { userData: {}, user: {}, layouts: JSON.parse(JSON.stringify(originalLayouts)) };
    this.onLayoutChange.bind(this);
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30
    };
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
    const { userData, user } = this.state;
    return (
      <div>
        <Nav />
        {
          (isLoggedIn()) ? <h3 className="text-center">Welcome back, {user.name}!</h3>
          : <h3 className="text-center">Welcome to Aegis of Flame!</h3>
        }
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          <div key="a" data-grid={{ w: 2, h: 13, x: 0, y: 0, minW: 2, minH: 13, maxH: 13 }}>
            <DKPTracker/>
          </div>
          <div key="b" data-grid={{ w: 5, h: 25, x: 2, y: 0, minW: 3, minH: 1, maxH: 25 }}>
            <News/>
          </div>
          <div key="c" data-grid={{ w: 3, h: 5, x: 7, y: 0, minW: 2, minH: 5, maxH: 5 }}>
            <Events/>
          </div>
          <div key="d" data-grid={{ w: 2, h: 9, x: 10, y: 0, minW: 2, minH: 10, maxH: 17 }}>
            <DiscordWidget/>
          </div>
          <div key="e" data-grid={{ w: 2, h: 7.5, x: 10, y: 10, minW: 2, minH: 1, maxH: 17 }}>
            <CurrentGames/>
          </div>
        </ResponsiveReactGridLayout>

      </div>
    )
  }
}

export default HomePage;

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}
