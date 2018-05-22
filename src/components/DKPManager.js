import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Alert, Checkbox, Fade } from 'react-bootstrap';
import { getDkp, setDkp } from '../utils/api';
import { showSuccessMessage, showErrorMessage } from '../utils/utils';
import DankAlert from './DankAlert';

class DKPManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUsers: [],
      reason: "",
      dkpAmount: 0
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
    const { selectedUsers, dkpAmount, reason } = this.state;

    setDkp({ selectedUsers, dkpAmount, reason }).then(response => {
      this.refs.alert.showAlert("FP updated successfully.", "success");
    }).catch((err) => {
      this.refs.alert.showAlert(`Error: ${err.response.data}`, "danger");
    });
  }

  render() {
    return (
      <div className="row">
       
        <DankAlert ref="alert"/>

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
                name="dkpAmount"
                onChange={ this.handleInputChange }
                value={this.state.dkpAmount}
                type="number"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Reason</ControlLabel>
              <FormControl
                name="reason"
                placeholder="Reason for FP change"
                onChange={ this.handleInputChange }
                value={ this.state.reason }
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
