import DataSf from '../../../src/helpers/DataSf';

export default (req) => {
  return new Promise((resolve, reject) => {
    new DataSf().get()
      .then( response => resolve(response) )
      .catch( error => reject(error) )
  })
}
