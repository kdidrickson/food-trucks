import GoogleMaps from '../../../src/helpers/GoogleMaps';
/*
  Takes the following URL parameters:

  locationValue[string]: Address to geolocate using Google Maps
*/
export default (req={}) => {
  return new Promise((resolve, reject) => {
    req.query = req.query || {};

    if (! req.query.locationValue) {
      return reject(`Must specify location value`);
    }

    const params = {
      address: `${req.query.locationValue} san francisco`
    };

    new GoogleMaps().get(null, { params })
      .then( response => resolve(response.results[0].geometry.location) )
      .catch( error => reject(error) )
  })
}
