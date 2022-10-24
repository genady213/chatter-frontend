import moment from 'moment';

import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from "../actionTypes";
import apiClient from "./apiClient";

const attachTokenToRequest = (token = null) => {
  apiClient.defaults.headers['Authorization'] = token ? `Bearer ${token}` : '';
}

export const authSuccess = (user) => {
  return {
    type: AUTH_SUCCESS,
    user: user,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  apiClient.post("/rest-auth/logout/");

  // Removing authorization token from axios request
  attachTokenToRequest();
  return {
    type: AUTH_LOGOUT,
  };
};

export const authLogin = (usern, password) => async (dispatch) => {
  try {
    const res = await apiClient.post("/user/login/", {
      usern: usern,
      password: password,
    });

    const user = res.data.user;
    const token = res.data.access_token;

    attachTokenToRequest(token);
    dispatch(authSuccess(user));
  } catch(err) {
    dispatch(authFail(err));
  }
};

export const authSignup = (name, usern, password) => async dispatch => {
  try {
    const res = await apiClient.post("/user/signup/", {
      name: name,
      usern: usern,
      password: password,
    });

    const user = res.data.user;
    const token = res.data.access_token;

    attachTokenToRequest(token);
    dispatch(authSuccess(user));
  } catch(err) {
    dispatch(authFail(err));
  };
};

