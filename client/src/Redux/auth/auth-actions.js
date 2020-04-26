import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../../utils/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./auth-types";

// Register User
export const registerUser = (data) => (dispatch) => {
  axios
    .post("/api/users/register", data.newUser)
    .then((res) => data.history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login user
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => setToken(res, dispatch))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Google Login
export const googleLogin = (userData) => (dispatch) => {
  axios
    .post("/api/users/oauth", userData)
    .then((res) => setToken(res, dispatch))
    .catch((err) => console.log(err));
};

export const editProfile = (data) => (dispatch) => {
  let pass = data.newUser ? data.newUser : data;
  axios
    .post("/api/users/editprofile", pass)
    .then(async (res) => {
      let ee = await setToken(res, dispatch);
      data.history.push("/dashboard");
      console.log(ee);
    })
    .catch((err) => console.log(err));
};

const setToken = (res, dispatch) => {
  // Save token to local storage
  const { token } = res.data;
  // Set token to ls
  localStorage.setItem("jwtToken", token);
  // Set token to Auth header
  setAuthToken(token);
  // Decode jwt token
  const decode = jwt_decode(token);
  // Set current user
  dispatch(setCurrentUser(decode));
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future request
  setAuthToken(false);
  // Set current user to {} and isAuthenticator to false
  dispatch(setCurrentUser({}));
};
