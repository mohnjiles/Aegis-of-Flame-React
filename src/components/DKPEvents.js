import React, { Component } from 'react';
import { getDkpEvents } from '../utils/api';
import { Panel } from 'react-bootstrap';

class DKPEvents extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: props.id, dkpEvents: null };
  }

  componentDidMount() {
    this.getDkpEvents();
  }

  getDkpEvents() {
    getDkpEvents(this.state.userId).then(dkpEvents => {
      this.setState({dkpEvents: dkpEvents});
    });
  }

  render() {
    return (
        <div className="col-sm-3 col-sm-offset-2">
          <Panel bsStyle="primary" header="FP History">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>FP Change</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                  {
                    this.state.dkpEvents != null ?
                    this.state.dkpEvents.map((event, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {event.dkp_change}
                          </td>
                          <td>
                            {event.reason}
                          </td>
                        </tr>
                      )
                    })
                    : ''
                  }
              </tbody>
            </table>
          </Panel>
        </div>
    )
  }
}

export default DKPEvents;
