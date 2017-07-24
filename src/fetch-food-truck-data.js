// Returns a promise resolving to object containing food truck data
import moment from 'moment';

import { fetchFoodTruckData } from './redux/modules/food-trucks';
import { fetchCoordinatesData } from './redux/modules/location';

export default ({
  locationValue,
  dispatch,
  client,
  page
}) => {
  return new Promise((resolve, reject) => {
    try {
      if (! client) {
        throw new Error(`Must provide client instance`);
      }

      // Query the location query's coordinates for map display in a separate thread
      let willFetchLocationCoordinates;

      if (locationValue) {
        willFetchLocationCoordinates = client.get('/location/getCoordinates', { params: { locationValue } });

        dispatch(fetchCoordinatesData());

        willFetchLocationCoordinates
          .then( data => {
            dispatch(fetchCoordinatesData({ status: 'success', coordinates: data.results[0].geometry.location }));
            return data;
          })
          .catch( coordinatesDataError => {
            dispatch(fetchCoordinatesData({ status: 'error', coordinatesDataError }));
          });
      } else {
        willFetchLocationCoordinates = Promise.resolve(null);
      }

      // Once we have the location coordinates, we can sort based on food truck proximity
      willFetchLocationCoordinates.then( locationCoordinates => {
        let params = { page };

        if (locationCoordinates) {
          params = {
            ...params,
            location_lat: locationCoordinates.lat,
            location_lng: locationCoordinates.lng
          };
        }

        const willFetchFoodTruckData = client.get('/foodTruck/load', { params });

        dispatch(fetchFoodTruckData());

        // If the request takes less than `minRequestDuration`, then artificially delay
        // display of the result so there isn't a flashy/jerky effect
        const requestTime = new Date();
        const minRequestDuration = 1000; // in milliseconds

        willFetchFoodTruckData
          .then( data => {
            const doDispatchFoodTruckData = () => {
              dispatch(fetchFoodTruckData({ status: 'success', data }));
              resolve(data);
            };

            const requestDuration = moment(requestTime).diff( new Date() );
            const timeToWait = minRequestDuration - requestDuration;

            // If `timeToWait` is negative then `doDispatchFoodTruckData` will execute immediately
            setTimeout( doDispatchFoodTruckData, timeToWait );
          })
          .catch( foodTruckDataError => {
            dispatch(fetchFoodTruckData({ status: 'error', foodTruckDataError }));
            reject(foodTruckDataError);
          });
      });
    } catch ( error ) {
      console.log( error );

      return Promise.reject( error );
    }
  });
};
