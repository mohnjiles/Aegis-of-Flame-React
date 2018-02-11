import React, { Component } from 'react';
import ReactMde, { ReactMdeCommands } from 'react-mde';
import { FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';
import { addNews } from '../utils/api';

class AddNews extends Component {

  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { mdeValue: { text: '', selection: null }, title: '' };
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
    const { mdeValue, title } = this.state;
    addNews({ title, content: mdeValue.text }).then(response => {
      console.log('success');
    }).catch(error => {
      console.log(error);
    });
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
                  name="title"
                  type="text"
                  value={this.state.title}
                  placeholder="Title"
                  onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                    Post Content
                </ControlLabel>
                <ReactMde
                    textAreaProps={{
                        id: 'ta1',
                        name: 'ta1',
                    }}
                    value={this.state.mdeValue}
                    onChange={this.handleValueChange}
                    commands={ReactMdeCommands.getDefaultCommands()}
                />
              </FormGroup>
              <Button
                type="submit"
                bsStyle="success">Continue</Button>
            </form>

          </div>
      );
  }

}


export default AddNews;
