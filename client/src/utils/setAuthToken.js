import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    // Apply To every Request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Deleting Token
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
