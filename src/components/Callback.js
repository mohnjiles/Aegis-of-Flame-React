import { Component } from 'react';
import { setIdToken, setAccessToken, getUserData } from '../utils/AuthService';
import { getUser } from '../utils/api';

class Callback extends Component {

  async componentDidMount() {
    setAccessToken();
    await setIdToken();

    if (await this.doesUserExist(getUserData().email)) {
      window.location.href = "/aof2";
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
