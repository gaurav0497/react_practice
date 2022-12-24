import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import all Reducers
import reducers from "./reducers";

// import all Sagas
import sagas from "./sagas";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const initial_state = undefined;

const persist_config = {
  key: "gogita",
  storage,
  debug: true,
  whitelist: ["auth"],
};

const logger = createLogger({
  diff: false,
  logErrors: true,
  duration: true,
});

// define middlewares
let middlewares:any = [];

// create and add the saga middleware
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

//add the freeze and logger dev middleware
if (process.env.NODE_ENV !== "production") {
  middlewares.push(logger);
}

// apply the middleware
let middleware = applyMiddleware(...middlewares);

// // add the redux dev tools
/* eslint-disable no-underscore-dangle */
if (
  process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
  middleware = compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  );
}
/* eslint-enable */

const persisted_reducers = persistCombineReducers(persist_config, reducers);

const configure_store = () => {
  let store = createStore(persisted_reducers, initial_state, middleware);
  let persistor = persistStore(store);
  sagaMiddleware.run(sagas);
  return { store, persistor };
};

export default configure_store;
