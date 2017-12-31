import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';
import { addUser } from '../utils/api';
import { getUserData } from '../utils/AuthService';

class Onboarding extends Component {

  constructor(props) {
    super(props);
    this.state = { name: "", steamUrl: "", timezone: "America/New_York", email: getUserData().email, alertVisible: false, alertText: "" };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, steamUrl, timezone, email } = this.state;
    addUser({name, steamUrl, timezone, email}).then(response => {
      window.location.href = '/';
    }).catch(error => {
      console.log(error);
      this.setState({alertVisible: true});
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <h1 className="text-center underline">Aegis of Flame Onboarding</h1>
        </div>

        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            { this.state.alertVisible ?
              <Alert bsStyle="danger">
                Error: {this.state.alertText}
              </Alert>
              : ''
            }

            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel>
                    What should we call you?
                </ControlLabel>
                <FormControl
                  name="name"
                  type="text"
                  value={this.state.name}
                  placeholder="Nickname"
                  onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                    What's your steam profile?
                </ControlLabel>
                <FormControl
                  name="steamUrl"
                  type="text"
                  value={this.state.steamUrl}
                  placeholder="Steam Profile URL"
                  onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                    What timezone are you in?
                </ControlLabel>
                <FormControl
                  name="timezone"
                  componentClass="select"
                  value={this.state.timezone}
                  placeholder="Select"
                  onChange={this.handleInputChange} >
                  <option value="America/New_York">Eastern Time (UTC-5)</option>
                  <option value="America/Chicago">Central Time (UTC-6)</option>
                  <option value="America/Denver">Mountain Time (UTC-7)</option>
                  <option value="America/Los_Angeles">Pacific Time (UTC-8)</option>
                </FormControl>
              </FormGroup>
              <Button
                type="submit"
                bsStyle="success">Continue</Button>
            </form>
          </div>
        </div>
      </div>
    )
  }


}

export default Onboarding;
