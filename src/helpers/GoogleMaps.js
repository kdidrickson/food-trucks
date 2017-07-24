import request from 'request-promise';
import config from '../config';

// This API only supports GET requests
const methods = ['get'];

export default class GoogleMaps {
  constructor() {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        try {
          const uri = `${config.apis.googleMaps.endpoint}${path || ''}`;

          request({
            uri,
            method,
            qs: {
              key: config.apis.googleMaps.token,
              ...params
            },
              body: data,
              json: true
          })
            .then( response => resolve(response) )
            .catch( error => { throw new Error(error) });
        } catch (error) {
          console.log(error);

          return reject(error);
        }
      }));
    }
    /*
     * There's a V8 bug where, when using Babel, exporting classes with only
     * constructors sometimes fails. Until it's patched, this is a solution to
     * "ApiClient is not defined" from issue #14.
     * https://github.com/erikras/react-redux-universal-hot-example/issues/14
     *
     * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
     *
     * Remove it at your own risk.
     */
    empty() {}
}
