import DataSf from '../../../src/helpers/DataSf';
import getCoordinates from '../location/getCoordinates';

/*
  Takes the following URL parameters:

  itemsPerPage: Number of items per page. Default is 10
  page: Page number. Default is 1
  location_lat: Latitude by which to sort the results, such that the first result is the closest to the provided point.
  location_lng: Latitude by which to sort the results, such that the first result is the closest to the provided point.
  locationValue: Query string for location
*/
export default (req={}) => {
  return new Promise((resolve, reject) => {
    req.query = req.query || {};

    let willGetCoordinates = Promise.resolve();

    console.log(req.query)
    if( req.query.locationValue ) {
      willGetCoordinates = getCoordinates(req);
    }

    willGetCoordinates.then( (coordinates) => {
      console.log(coordinates);
      let params = {};

      const page = parseInt( req.query.page ) >= 1 ? parseInt( req.query.page ) : 1;
      const itemsPerPage = parseInt( req.query.itemsPerPage ) >= 1 ? parseInt( req.query.itemsPerPage ) : 10;

      params = {
        ...params,
        $limit: itemsPerPage,
        $offset: (page-1) * itemsPerPage
      };

      if (coordinates || (Number(req.query.location_lat) && Number(req.query.location_lng))) {
        const longitude = coordinates.lng || req.query.location_lng;
        const latitude = coordinates.lat || req.query.location_lat;

        params = {
          ...params,
          $order: `DISTANCE_IN_METERS(location, 'POINT(${longitude} ${latitude})')`,
          $where: `latitude != 0 AND longitude != 0`
        };
      }

      new DataSf().get(null, { params })
        .then( response => resolve(response) )
        .catch( error => reject(error) )
    });
  })
}
