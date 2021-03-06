import React, {Component} from 'react';
import {getUsersById, getLodestoneData, getFFLogsData} from '../utils/api';
import Nav from './Nav';
import {Panel} from 'react-bootstrap';
import DKPEvents from './DKPEvents';
import {getUserData} from '../utils/AuthService';
import SetLodestoneId from './SetLodestoneId';
import BestLogs from './BestLogs';
import ClassJobs from './ClassJobs';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.match.params.id,
      user: null,
      dkpEvents: null,
      isOwnPage: false,
      lodestoneData: null,
      fflogsData: null
    };
  }

  componentDidMount() {
    this.getUserInfo();

    if (this.state.userId === getUserData().id) {
      this.setState({isOwnPage: true});
    }
  }

  getUserInfo() {
    getUsersById(this.state.userId).then(users => {
      this.setState({user: users[0]});
      if (this.state.user.lodestone_id !== "") {
        getLodestoneData(this.state.user.lodestone_id).then(data => {
          this.setState({lodestoneData: data});

          let name = data.data.name;
          let server = data.data.server;
          let metric = "dps";
          
          getFFLogsData(name, server, metric).then(data => {
            this.setState({fflogsData: data});
          })
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Nav/>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            {this.state.isOwnPage && this.state.user && this.state.user.lodestone_id === ""
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
                      <div className="row">
                        <div className="col-sm-6">
                          <h3 style={{padding:0, margin:0}}>{this.state.lodestoneData.name}</h3>
                          <h5>{this.state.lodestoneData.data.title}</h5>
                        </div>
                        <div className="col-sm-6 align-right">
                          <span>
                            Mounts: {this.state.lodestoneData.extras.mounts.obtained} / {this.state.lodestoneData.extras.mounts.total} ({this.state.lodestoneData.extras.mounts.percent}%)
                          </span>
                          <br/>
                          <span>
                            Minions: {this.state.lodestoneData.extras.minions.obtained} / {this.state.lodestoneData.extras.minions.total} ({this.state.lodestoneData.extras.minions.percent}%)
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <ClassJobs lodestoneData={this.state.lodestoneData}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <BestLogs 
                      name={this.state.lodestoneData.data.name}
                      server={this.state.lodestoneData.data.server}
                      metric="dps"
                    />
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
