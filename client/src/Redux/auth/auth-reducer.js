import { GET_ERRORS, SET_CURRENT_USER } from "./auth-types";
import isEmpty from "../../utils/is-empty";

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {},
  errors: {},
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
