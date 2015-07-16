var hapi = require('hapi'),
  server = new hapi.Server(),
  path = require('path'),
  handlebars = require('handlebars'),
  routes = require('./backend/routes.js');

server.connection({
  port: process.env.PORT || 8000
});

server.views({
  engines: {
    html: handlebars
  },
  path: path.join(__dirname, '/public/templates')
});

server.route(routes);

server.start(function() {
  server.log('Server running at: ' + server.info.uri);
});


module.exports = server;
