import { createSelector } from "reselect";

const selectWishlist = (state) => state.wishlist;

export const selectWishlistInfo = createSelector(
  [selectWishlist],
  (wishlist) => wishlist
);
