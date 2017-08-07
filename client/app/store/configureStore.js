import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState,
    composeEnhancers(applyMiddleware(thunk)));
}
