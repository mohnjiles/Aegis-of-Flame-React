import axios from 'axios';
import {getAccessToken} from './AuthService';

const config = require('../config.json');

const BASE_URL = config.api_base_url;
const FFLOGS_API_KEY = config.fflogs_api_key;

export {getFoodData, getUser, addUser, getDkp, getDkpEvents, getUsersById, getGames, getNews, setDkp, addNews, getEvents, updateLodestoneId, getLodestoneData, getFFLogsData};


function getFoodData() {
  const url = `${BASE_URL}/api/jokes/food`;
  return axios.get(url).then(response => response.data);
}

function getUser(email) {
  const url = `${BASE_URL}/api/user/${email}`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
}

function getUsersById(id) {
  const url = `${BASE_URL}/api/user/id/${id}`;
  return axios.get(url).then(response => response.data);
}

function addUser(formData) {
  const url = `${BASE_URL}/api/user`;
  return axios.post(url, formData).then(response => response.data);
}

function getDkp() {
  const url = `${BASE_URL}/api/dkp`;
  return axios.get(url).then(response => response.data);
}

function getDkpEvents(id) {
  const url = `${BASE_URL}/api/dkpevents/${id}`;
  return axios.get(url).then(response => response.data);
}

function getGames() {
  const url = `${BASE_URL}/api/games`;
  return axios.get(url).then(response => response.data);
}

function getNews() {
  const url = `${BASE_URL}/api/news`;
  return axios.get(url).then(response => response.data);
}

function addNews(formData) {
  const url = `${BASE_URL}/api/news`;
  return axios.post(url, formData).then(response => response.data);
}

function setDkp(formData) {
  const url = `${BASE_URL}/api/dkp`;
  return axios.post(url, formData);
}

function getEvents() {
  const url= `${BASE_URL}/api/events`;
  return axios.get(url).then(response => response.data);
}

function addEvents(formData) {
  const url = `${BASE_URL}/api/events`;
  return axios.post(url, formData).then(response => response.data);
}

function updateLodestoneId(formData) {
  const url = `${BASE_URL}/api/lodestone`;
  return axios.post(url, formData).then(response => response.data);
} 

function getLodestoneData(id){
  const url = `https://api.xivdb.com/character/${id}`;
  return axios.get(url).then(response => response.data);
}

function getFFLogsData(characterName, server, metric) {
  const url = `${BASE_URL}/api/fflogs/${characterName}/${server}/${metric}`;
  return axios.get(url).then(response => response.data);
}