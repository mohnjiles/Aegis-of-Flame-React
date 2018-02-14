import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Alert, Fade } from 'react-bootstrap';
import { addNews } from '../utils/api';
import moment from 'moment';

class EventManager extends Component {

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave= this.handleSave.bind(this);
    this.state = { moment: moment(), 
        name: '', 
        startTime: null, 
        minILvl: null,
        alertVisible: false,
        successVisible: false,
        alertText: '',
        successText: '' };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleChange = (moment) => {
    this.setState({ moment });
  };

  handleSave = () => {
    console.log('saved', this.state.moment.utc());
  };

  handleSubmit(event) {
    event.preventDefault();
    const {name, startTime, minILvl } = this.state;
    // addUser({name, steamUrl, timezone, email}).then(response => {
    //   window.location.href = '/';
    // }).catch(error => {
    //   console.log(error);
    //   this.setState({alertVisible: true});
    // });
  }

  render() {

      return (
          <div className="col-md-9">
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel>
                    Event Name
                </ControlLabel>
                <FormControl
                  name="name"
                  type="text"
                  value={this.state.name}
                  placeholder="Event Name"
                  onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                    Min. Item Level
                </ControlLabel>
                <FormControl
                  name="minILvl"
                  type="number"
                  value={this.state.minILvl}
                  placeholder="Min. Item Level"
                  onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                  <ControlLabel>
                      Start Time
                  </ControlLabel>
                  <FormControl
                    name="startTime"
                    type="text"
                    value={this.state.startTime}
                    placeholder="Example: Tomorrow 10:15 PM"
                    onChange={this.handleInputChange} />
              </FormGroup>
              <Button
                type="submit"
                bsStyle="success">Submit</Button>
            </form>

          </div>
      );
  }

}


export default EventManager;
