import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import userReducer from "./usersReducer";
import thunk from 'redux-thunk';

const rootReducer = (state = {}, action) => {
  return {
    users: userReducer(state.users, action)
  };
};

const logger = require("redux-logger").default;
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, logger));

const configureStore = (preloadedState = {}) => {
  return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;