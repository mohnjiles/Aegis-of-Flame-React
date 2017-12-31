import decode from 'jwt-decode';
import auth0 from 'auth0-js';
import { getUser } from '../utils/api';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const USER_ID = 'user_id';

/******************************************

  PUT THIS IN SEPARATE CONFIG FILE NOT ON GIT
  IF WE EVER MAKE THIS PUBLIC

******************************************/
const CLIENT_ID = 'N5OGwtQ8haOFjz4wfgiyF8ic5NrInpU5';
const CLIENT_DOMAIN = 'aof.auth0.com';
const REDIRECT = 'http://jtmiles.xyz/aof2/callback';
const SCOPE = 'openid email';
const AUDIENCE = 'aof';

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

export function login() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE
  });
}

export function logout() {
  clearIdToken();
  clearAccessToken();
  window.location.href = '/aof2';
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({pathname: '/aof2'});
  }
}

export function getUserData() {
  return {
    id: localStorage.getItem(USER_ID),
    email: localStorage.getItem("user_email")
  };
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
  localStorage.removeItem(USER_ID);
  localStorage.removeItem("user_email");
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export async function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
  await setUserData(idToken);
}

async function setUserData(idToken){
  const token = decode(idToken);
  if (token.email) {
    localStorage.setItem("user_email", token.email);
    let user = await getUser(token.email);
    if (user && user.id) {
      localStorage.setItem(USER_ID, user.id);
    }
  }
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
