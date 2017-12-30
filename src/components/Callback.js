import { Component } from 'react';
import { setIdToken, setAccessToken } from '../utils/AuthService';

class Callback extends Component {

  async componentDidMount() {
    setAccessToken();
    await setIdToken();
    window.location.href = "/";
  }

  render() {
    return null;
  }
}

export default Callback;
