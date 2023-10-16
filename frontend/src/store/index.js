import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import session from "./session";
import restaurants from "./restaurants";
import reviews from "./reviews";
import thunk from 'redux-thunk';
import reactions from './reactions';
import users from './users';

const rootReducer = combineReducers({
  session,
  restaurants,
  reviews,
  reactions,
  users
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

export default function configureStore(preloadedState = {}) {
  return createStore(rootReducer, preloadedState, enhancer);
}