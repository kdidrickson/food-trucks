// Returns a promise resolving to object containing food truck data
import moment from 'moment';

import { fetchFoodTruckData } from './redux/modules/food-trucks';

export default ({
  // locationValue,
  dispatch,
  client,
  page
}) => {
  try {
    if (! client) {
      throw new Error(`Must provide client instance`);
    }

    const willFetchFoodTruckData = client.get('/foodTruck/load', { params: { page } });

    dispatch(fetchFoodTruckData());

    // If the request takes less than `minRequestDuration`, then artificially delay
    // display of the result so there isn't a flashy/jerky effect
    const requestTime = new Date();
    const minRequestDuration = 1000; // in milliseconds

    willFetchFoodTruckData
      .then( data => {
        const doDispatchFoodTruckData = () => dispatch(fetchFoodTruckData({ status: 'success', data }));
        const requestDuration = moment(requestTime).diff( new Date() );
        const timeToWait = minRequestDuration - requestDuration;

        // If `timeToWait` is negative then `doDispatchFoodTruckData` will execute immediately
        setTimeout( doDispatchFoodTruckData, timeToWait );
      })
      .catch( foodTruckDataError => {
        dispatch(fetchFoodTruckData({ status: 'error', foodTruckDataError }));
      });

    return willFetchFoodTruckData;
  } catch ( error ) {
    console.log( error );

    return Promise.reject( error );
  }
};
