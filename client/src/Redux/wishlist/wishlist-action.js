import axios from "axios";

import { GET_WISHLIST } from "./wishlist-types";

export const getWishlist = (data) => async (dispatch) => {
  let products = [];
  let i = 0;
  while (i < data.length) {
    let wait = await axios.get(`/api/products/singleproduct/${data[i]}`);
    products.push(wait.data);
    if (data.length === products.length) {
      dispatch({
        type: GET_WISHLIST,
        payload: products,
      });
    }
    i++;
  }
};
