import { createSelector } from "reselect";

const selectProduct = (state) => state.product;

export const selectProductInfo = createSelector(
  [selectProduct],
  (product) => product
);
