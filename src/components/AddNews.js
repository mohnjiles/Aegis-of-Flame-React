import React, { Component } from 'react';
import ReactMde, { ReactMdeCommands } from 'react-mde';
import { FormGroup, FormControl, ControlLabel, Button, Alert, Fade } from 'react-bootstrap';
import { addNews } from '../utils/api';

class AddNews extends Component {

  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { 
        mdeValue: { text: '', selection: null }, 
        title: '',
        alertVisible: false,
        alertText: "",
        successText: "",
        successVisible: false
      };
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
      this.setState({ successVisible: true, successText: "News added successfully."})
      setTimeout(() => {
        this.setState({ successVisible: false});
      }, 5000);
    }).catch(error => {
      this.setState({ alertVisible: true, alertText: error.response.data});
      setTimeout(() => {
        this.setState({ alertVisible: false});
      }, 5000);
    });
  }

  render() {

      return (
          <div className="col-md-9">
          { this.state.alertVisible ?
          (
            <Fade in={this.state.alertVisible}>
            <Alert bsStyle="danger">
                  {this.state.alertText}
              </Alert>
            </Fade>
          ) : ''
          }
          { this.state.successVisible ?
          (
            <Fade in={this.state.successVisible}>
            <Alert bsStyle="success">
                  {this.state.successText}
              </Alert>
            </Fade>
          ) : ''
          }
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
