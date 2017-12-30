import axios from 'axios';
import {getAccessToken} from './AuthService';

const BASE_URL = 'http://localhost:3333';

export {getFoodData, getUser, addUser};


function getFoodData() {
  const url = `${BASE_URL}/api/jokes/food`;
  return axios.get(url).then(response => response.data);
}

function getUser(email) {
  const url = `${BASE_URL}/api/user/${email}`
  return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
}

function addUser(formData) {
  const url = `${BASE_URL}/api/user`
  return axios.post(url, formData).then(response => response.data);
}
