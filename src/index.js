import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage';
import Callback from './components/Callback';
import Onboarding from './components/onboarding/Onboarding';
import UserProfile from './components/UserProfile';
import AdminPage from './components/AdminPage';
import MarshallComponent from './components/MarshallComponent';
import { BrowserRouter, Route } from 'react-router-dom';
import { requireAuth } from './utils/AuthService';


const Root = () => {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <div>
          <Route exact path="/" component={HomePage}/>
          {/* <Route path="/special" component={CelebrityJokes} onEnter={requireAuth}/> */}
          <Route path="/callback" component={Callback}/>
          <Route path="/user/:id" component={UserProfile}/>
          <Route path="/onboarding" component={Onboarding} onEnter={requireAuth}/>
          <Route path="/admin" component={AdminPage} onEnter={requireAuth}/>
        </div>
      </BrowserRouter>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
