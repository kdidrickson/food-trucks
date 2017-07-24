import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import location from './location';
import foodTrucks from './food-trucks';

export default combineReducers({
  reduxAsyncConnect,
  routing: routerReducer,
  location,
  foodTrucks
});
