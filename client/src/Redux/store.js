import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";

import rootReducer from "./root-reducer";

const middleware = [thunk];
let mid;
if (process.env.NODE_ENV === "development") {
  mid = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  mid = applyMiddleware(...middleware);
}

export const store = createStore(rootReducer, mid);

export const persister = persistStore(store);
