import React, { Component } from 'react';
import { getDkp } from '../utils/api';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class DKPTracker extends Component {

  constructor(props){
    super(props);
    this.state = { dkp: [] }
  }

  componentDidMount() {
    this.getDkp();
  }

  getDkp() {
    getDkp().then(users => {
      let dkpResult = users.map(user => {
        return {id: user.id, name: user.name, dkp: user.dkp != null ? user.dkp.dkp : 0}
      })
      .sort((a, b) => {
        return parseInt(b.dkp, 10) - parseInt(a.dkp, 10);
      });
      this.setState({dkp: dkpResult});
    });
  }


  render() {
    return (
      <div>
        <Panel header="Flamer Points Tracker" bsStyle="primary">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th className="align-right">FP</th>
              </tr>
            </thead>
            <tbody>
                {
                  this.state.dkp.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td className={user.dkp >= 0 ? "" : "dkp-bad"}>
                          <Link to={"/user/" + user.id}>{user.name}</Link>
                        </td>
                        <td className={user.dkp >= 0 ? "align-right" : "dkp-bad align-right"}>
                          <Link to={"/user/" + user.id}>{user.dkp}</Link>
                        </td>
                      </tr>
                    )
                  })
                }
            </tbody>
          </table>
        </Panel>
      </div>
    )
  }
}

export default DKPTracker;
