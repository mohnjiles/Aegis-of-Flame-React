import React, {Component} from 'react';
import {FormGroup, FormControl, ControlLabel, Button, Alert, Checkbox} from 'react-bootstrap';
import {getDkp} from '../utils/api';

class DKPManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUsers: [],
      alertVisible: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  componentDidMount() {
    this.getDkp();
  }

  getDkp() {
    getDkp().then(users => {
      let dkpResult = users.map(user => {
        return {id: user.id, name: user.name, dkp: user.dkp != null ? user.dkp.dkp : 0}
      });

      this.setState({users: dkpResult});
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  onCheckChange(e) {
  // current array of options
  const users = this.state.selectedUsers
  let index;

  // check if the check box is checked or unchecked
  if (e.target.checked) {
    // add the numerical value of the checkbox to options array
    users.push(+e.target.value)
  } else {
    // or remove the value from the unchecked checkbox from the array
    index = users.indexOf(+e.target.value)
    users.splice(index, 1)
  }

  // update the state with the new array of options
  this.setState({ selectedUsers: users });
  console.log(this.state.selectedUsers);
}

  handleSubmit(event) {
    event.preventDefault();
    // const { name, steamUrl, timezone, email } = this.state;
    // addUser({name, steamUrl, timezone, email}).then(response => {
    //   window.location.href = '/';
    // }).catch(error => {
    //   console.log(error);
    //   this.setState({alertVisible: true});
    // });
  }

  render() {
    return (
      <div className="row">
        {this.state.alertVisible
          ? <Alert bsStyle="danger">
              Error: {this.state.alertText}
            </Alert>
          : ''
        }
        <div className="col-sm-9">
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <div className="col-sm-2">
                <ControlLabel>
                  User
                </ControlLabel>
              </div>
              <div className="col-sm-10">
                {this.state.users.map((user, index) => {
                  return (
                      <Checkbox
                        key={index}
                        name="users[]"
                        type="checkbox"
                        value={user.id}
                        onChange={this.onCheckChange}>
                        {user.name}
                        </Checkbox>
                  )
                })}
              </div>
            </FormGroup>
            <FormGroup>
              <ControlLabel>FP</ControlLabel>
              <FormControl
                name="dkp"
                placeholder="Enter a negative value to remove FP"
                type="text"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Reason</ControlLabel>
              <FormControl
                name="reason"
                placeholder="Reason for FP change"
                type="text"/>
            </FormGroup>
            <Button type="submit" bsStyle="success">Submit</Button>
          </form>
        </div>
      </div>
    )
  }

}

export default DKPManager;