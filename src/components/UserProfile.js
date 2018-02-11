import React, { Component } from 'react';
import { getUsersById, getDkpEvents } from '../utils/api';
import Nav from './Nav';
import { Panel } from 'react-bootstrap';
import DKPEvents from './DKPEvents';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: props.match.params.id, user: null, dkpEvents: null };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    getUsersById(this.state.userId).then(users => {
      this.setState({user: users[0]});
    });
  }

  render() {
    return (
      <div>
        <Nav/>
        <div className="row">
          <DKPEvents id={this.state.userId}/>
          <div className="col-sm-5">
            { (this.state.user != null) ? (
                <Panel bsStyle="success" className="text-center" header={this.state.user.name}>
                    <div className="row">
                      <div className="col-sm-3">
                        <img className="rounded-corner" alt={this.state.user.name} src={this.state.user.classes[0].avatar}/>
                        <p>Total FP: {this.state.user.dkp.dkp}</p>
                      </div>
                    </div>
                </Panel>
              ) : ''
            }
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile;
