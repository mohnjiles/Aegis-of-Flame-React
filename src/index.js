import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage';
import Callback from './components/Callback';
import Onboarding from './components/Onboarding';
import UserProfile from './components/UserProfile';
import AdminPage from './components/AdminPage';
import {BrowserRouter, Route} from 'react-router-dom';
import {requireAuth} from './utils/AuthService';

import 'font-awesome/css/font-awesome.css';
import 'react-mde/lib/styles/css/react-mde-all.css';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const config = require('./config.json');

const Root = () => {
  return (
    <div className="container-fluid">
      {config.prod === "false"
        ? (
          <BrowserRouter>
            <div>
              <Route exact path="/" component={HomePage}/>
              <Route path="/callback" component={Callback}/>
              <Route path="/user/:id" component={UserProfile}/>
              <Route path="/onboarding" component={Onboarding} onEnter={requireAuth}/>
              <Route path="/admin" component={AdminPage} onEnter={requireAuth}/>
            </div>
          </BrowserRouter>
        )
        : (
          <BrowserRouter basename={'aof2'}>
            <div>
              <Route exact path="/" component={HomePage}/>
              <Route path="/callback" component={Callback}/>
              <Route path="/user/:id" component={UserProfile}/>
              <Route path="/onboarding" component={Onboarding} onEnter={requireAuth}/>
              <Route path="/admin" component={AdminPage} onEnter={requireAuth}/>
            </div>
          </BrowserRouter>
        )
      }
    </div>
  )
}

ReactDOM.render(
  <Root/>, document.getElementById('root'));
