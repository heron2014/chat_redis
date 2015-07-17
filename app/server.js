var Hapi = require('hapi'),
  server = new Hapi.Server(),
  path = require('path'),
  handlebars = require('handlebars'),
  routes = require('./routes.js');

server.connection({
  port: process.env.PORT || 8000
});

server.views({
  engines: {
    html: handlebars
  },
  path: path.join(__dirname,'../public/views')
});

server.route(routes);

server.start(function() {
  server.log('Server running at: ' + server.info.uri);
});


module.exports = server;
