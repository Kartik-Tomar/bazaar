import { GET_WISHLIST } from "./wishlist-types";

const INITIAL_STATE = {
  myWishlist: [],
};

const wishlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_WISHLIST:
      return {
        ...state,
        myWishlist: action.payload,
      };
    default:
      return state;
  }
};

export default wishlistReducer;
