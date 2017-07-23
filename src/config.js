require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'SF Food Trucks',
    description: 'Find food trucks in San Francisco',
    head: {
      titleTemplate: 'SF Food Trucks | %s',
      meta: [
        {name: 'description', content: 'Find food trucks in San Francisco'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'SF Food Trucks'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'SF Food Trucks'},
        {property: 'og:description', content: 'Find food trucks in San Francisco'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@kdidrickson'},
        {property: 'og:creator', content: '@kdidrickson'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
