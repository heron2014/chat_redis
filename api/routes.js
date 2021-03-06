var handlers = require('./handlers.js');

var routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: handlers.home
    }
  },

  {
    method: 'GET',
    path: '/load',
    config: {
      handler: handlers.loadAllMessages
    }
  },

  {
    method: 'GET',
    path: '/public/{path*}',
    handler: {
      directory: {
        path: './public'
      }
    }
  }
];

module.exports = routes;