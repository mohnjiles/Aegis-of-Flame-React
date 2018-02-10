import React, { Component } from 'react';
import ReactMde, { ReactMdeCommands } from 'react-mde';
import { FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';

class AddNews extends Component {

  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { mdeValue: { text: '', selection: null } };
  }

  handleValueChange = (value) => {
    this.setState({mdeValue: value});
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
                    Post Title
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
            <ReactMde
                textAreaProps={{
                    id: 'ta1',
                    name: 'ta1',
                }}
                value={this.state.mdeValue}
                onChange={this.handleValueChange}
                commands={ReactMdeCommands.getDefaultCommands()}
            />
          </div>
      );
  }

}


export default AddNews;
