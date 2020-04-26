import { GET_MY_PRODUCTS } from "./product-types";

const INITIAL_STATE = {
  myProducts: [],
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MY_PRODUCTS:
      return {
        ...state,
        myProducts: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
