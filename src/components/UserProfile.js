import React, {Component} from 'react';
import {getUsersById, getDkpEvents, getUser, getLodestoneData} from '../utils/api';
import Nav from './Nav';
import {Panel} from 'react-bootstrap';
import DKPEvents from './DKPEvents';
import {isLoggedIn, getUserData} from '../utils/AuthService';
import SetLodestoneId from './SetLodestoneId';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.match.params.id,
      user: null,
      dkpEvents: null,
      isOwnPage: false,
      lodestoneData: null
    };
  }

  componentDidMount() {
    this.getUserInfo();

    if (this.state.userId == getUserData().id) {
      this.setState({isOwnPage: true});
    }
  }

  getUserInfo() {
    getUsersById(this.state.userId).then(users => {
      this.setState({user: users[0]});
      if (this.state.user.lodestone_id != "") {
        getLodestoneData(this.state.user.lodestone_id).then(data => {
          this.setState({lodestoneData: data});
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Nav/>
        <div className="row">
          <div class="col-md-8 col-md-offset-2">
            {this.state.isOwnPage && this.state.user && this.state.user.lodestone_id == ""
              ? <SetLodestoneId/>
              : null}
          </div>
        </div>
        <div className="row top-1">
          <DKPEvents id={this.state.userId}/>
          <div className="col-sm-5">
            {(this.state.lodestoneData != null && this.state.user != null)
              ? (
                <Panel bsStyle="success" header={this.state.user.name}>
                  <div className="row">
                    <div className="col-sm-3 text-center">
                      <img
                        className="rounded-corner"
                        alt={this.state.user.name}
                        src={this.state.user.classes[0].avatar}/>
                      <p>Total FP: {this.state.user.dkp.dkp}</p>
                    </div>
                    <div className="col-sm-9">
                      <h4>{this.state.lodestoneData.name}</h4>
                      <h5>{this.state.lodestoneData.data.title}</h5>
                    </div>
                  </div>
                </Panel>
              )
              : ''
}
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile;
