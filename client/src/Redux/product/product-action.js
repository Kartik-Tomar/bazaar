import axios from "axios";

import { GET_MY_PRODUCTS } from "./product-types";

export const getMyProducts = (data) => async (dispatch) => {
  let products = [];
  let i = 0;
  while (i < data.length) {
    let wait = await axios.get(`/api/products/singleproduct/${data[i]}`);
    products.push(wait.data);
    if (data.length === products.length) {
      dispatch({
        type: GET_MY_PRODUCTS,
        payload: products,
      });
    }
    i++;
  }
};
