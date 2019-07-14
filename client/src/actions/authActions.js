import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";

import jwt_decode from "jwt-decode";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login User
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save to localStorage
      const { token } = res.data;
      //Save Token to localStorage
      localStorage.setItem("jwtToken", token);
      //Set Token to auth header
      setAuthToken(token);
      // Decode Token to get user data
      const decoded = jwt_decode(token);
      // Set Current User
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set Current User
export const setCurrentUser = decoded => dispatch =>
  dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });

// Logout User
export const logoutUser = () => dispatch => {
  // Remove Token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set the current user to {} and isAuthenticated to false
  dispatch(setCurrentUser({}));
};
