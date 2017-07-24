import DataSf from '../../../src/helpers/DataSf';
/*
  Takes the following URL parameters:

  itemsPerPage: Number of items per page. Default is 10
  page: Page number. Default is 1
  location_lat: Latitude by which to sort the results, such that the first result is the closest to the provided point.
  location_lng: Latitude by which to sort the results, such that the first result is the closest to the provided point.
*/
export default (req={}) => {
  return new Promise((resolve, reject) => {
    req.query = req.query || {};

    let params = {};

    const page = parseInt( req.query.page ) >= 1 ? parseInt( req.query.page ) : 1;
    const itemsPerPage = parseInt( req.query.itemsPerPage ) >= 1 ? parseInt( req.query.itemsPerPage ) : 10;

    params = {
      ...params,
      $limit: itemsPerPage,
      $offset: (page-1) * itemsPerPage
    };

    if( Number(req.query.location_lat) && Number(req.query.location_lng) ) {
      params = {
        ...params,
        $order: `DISTANCE_IN_METERS(location, 'POINT(${req.query.location_lng} ${req.query.location_lat})')`,
        $where: `latitude != 0 AND longitude != 0`
      };
    }

    new DataSf().get(null, { params })
      .then( response => resolve(response) )
      .catch( error => reject(error) )
  })
}
