import React, {Component} from 'react';
import {Nav as Navbar, NavItem} from 'react-bootstrap';
import Nav from './Nav';
import DKPManager from './DKPManager';

class AdminPage extends Component {

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = { selectedIndex: 1 }
  }

  handleSelect(selectedKey) {
    this.setState({selectedIndex: selectedKey});
  }

  renderSwitch(param) {
    switch(param){
      case 1:
        return <DKPManager/>
      default:
        return <div>Hello</div>
    }
  }

  render() {
    return (
      <div>
        <Nav/>
        <div class="container">
          <div class="col-sm-3">
            <Navbar bsStyle="pills" stacked activeKey={this.state.selectedIndex} onSelect={this.handleSelect}>
              <NavItem eventKey={1}>FP Management</NavItem>
              <NavItem eventKey={2}>Active Games Management</NavItem>
            </Navbar>
          </div>
          <div class="col-sm-9">
            {this.renderSwitch(this.state.selectedIndex)}
          </div>
        </div>
      </div>
    )
  }
}

export default AdminPage;
