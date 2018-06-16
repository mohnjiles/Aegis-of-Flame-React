import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Alert, Fade } from 'react-bootstrap';
import { updateLodestoneId } from '../utils/api';
import { getUserData } from '../utils/AuthService';

class SetLodestoneId extends Component {

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { 
        url: '',
        alertVisible: false,
        alertText: "",
        successText: "",
        successVisible: false
      };
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
    const { url } = this.state;
    const id = getUserData().id;

    updateLodestoneId({ url, id }).then(response => {
      this.setState({ successVisible: true, successText: "ID updated successfully."})
      setTimeout(() => {
        this.setState({ successVisible: false });
        window.location.reload();        
      }, 500);
    }).catch(error => {
      this.setState({ alertVisible: true, alertText: error.response.data});
      setTimeout(() => {
        this.setState({ alertVisible: false });
      }, 5000);
    });
  }

  render() {

      return (
          <div className="col-md-12 bg-thing">
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
          <h2>Hey! Looks like we don't have your lodestone ID. Could you put the URL to your lodestone page in the box below please? Thanks.</h2>
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel>
                    Lodestone URL
                </ControlLabel>
                <FormControl
                  name="url"
                  type="text"
                  value={this.state.url}
                  placeholder="URL"
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


export default SetLodestoneId;
