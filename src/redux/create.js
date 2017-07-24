import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';

import fetchFoodTruckData from '../fetch-food-truck-data';

export default function createStore(history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const reducer = require('./modules/reducer');
  if (data) {
    data.pagination = Immutable.fromJS(data.pagination);
  }
  const store = finalCreateStore(reducer, data);

  // Fetch new food truck data whenever the location changes
  let currentLocation = {};
  store.subscribe( () => {
    const previousLocation = currentLocation;
    const { dispatch } = store;
    const state = store.getState();

    currentLocation = state.location;

    if (
      currentLocation.locationValue &&
      previousLocation.locationValue !== currentLocation.locationValue &&
      previousLocation !== currentLocation
    ) {
      fetchFoodTruckData({ ...currentLocation, dispatch, client });
    }
  });

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'));
    });
  }

  return store;
}
