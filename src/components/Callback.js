import {Component} from 'react';
import {setIdToken, setAccessToken, getUserData} from '../utils/AuthService';
import {getUser} from '../utils/api';

const config = require('../config.json');

class Callback extends Component {

  async componentDidMount() {
    setAccessToken();
    await setIdToken();

    if (await this.doesUserExist(getUserData().email)) {
      if (config.prod === "true") {
        window.location.href = "/aof2";
      } else {
        window.location.href = '/';
      }

    } else {
      window.location.href = "/aof2/onboarding";
    }
  }

  async doesUserExist(email) {
    return (await getUser(email)) != null;
  }

  render() {
    return null;
  }
}

export default Callback;
