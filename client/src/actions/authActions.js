import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

import { returnErrors } from './errorActions';
import axios from 'axios';

// Register User
export const register = ({ firstName, lastName, email, password }) => dispatch => {
  // Headers                                                               // We mimick the api postman
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ firstName, lastName, email, password});

  axios.post('/api/LoggedInUsers', body, config)
    .then(res => dispatch({
      type: REGISTER_SUCCESS, 
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));

      dispatch({
        type: REGISTER_FAIL
      });
    });
}

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios.get('/api/auth/LoggedInUser', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));   // we call the error reducer and put the error we have into the error state
      dispatch({
        type: AUTH_ERROR
      })
    })
}

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;             // get state let's us get specific things from our state

  // Headers                                       // we need headers so we can mirror what the auth middleware we made requires
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  // If token, add to headers
  if(token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
}

// Login User
export const login = ({ email, password }) => dispatch => {
  // Headers                                                               // We mimick the api postman
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ email, password});

  axios.post('/api/Auth', body, config)
    .then(res => dispatch({
      type: LOGIN_SUCCESS, 
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));

      dispatch({
        type: LOGIN_FAIL
      });
    });
}

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};