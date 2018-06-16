import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { getEvents } from '../utils/api';
import Moment from 'react-moment';
import 'moment-timezone';

class Events extends Component {

  constructor(props){
    super(props);
    this.state = { events: [] }
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    getEvents().then(events => {
      this.setState({events: events});
    });
  }

  getNumMembersSignedUp(event) {
    let numMembersSignedUp = 0;
    if (event.tank1 != null)
      numMembersSignedUp++;
    if (event.tank2 != null)
      numMembersSignedUp++;
    if (event.healer1 != null)
      numMembersSignedUp++;
    if (event.healer2 != null)
      numMembersSignedUp++;
    if (event.dps1 != null)
      numMembersSignedUp++;
    if (event.dps2 != null)
      numMembersSignedUp++;
    if (event.dps3 != null)
      numMembersSignedUp++;
    if (event.dps4 != null)
      numMembersSignedUp++;

    return numMembersSignedUp;
  }

  render() {
    return (
      <div>
        <Panel header="Upcoming Events" bsStyle="success">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th>Event</th>
                <th>Date</th>
                <th>Slots</th>
              </tr>
            </thead>
            <tbody>
                {
                  this.state.events != null ?
                  this.state.events.map((event, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {event.name}
                        </td>
                        <td>
                          <Moment format="ddd MMM Do, hh:mm a">
                          {event.start_time}
                          </Moment>
                        </td>
                        <td>
                          {this.getNumMembersSignedUp(event)} / 8
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

export default Events;
