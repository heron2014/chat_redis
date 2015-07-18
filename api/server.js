var Hapi = require('hapi'),
  server = new Hapi.Server(),
  path = require('path'),
  handlebars = require('handlebars'),
  routes = require('./routes.js'),
  SocketIO = require('socket.io');
  

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
  var io = SocketIO.listen(server.listener);

  io.on('connection', function (socket) {
    console.log('this is client.conn.id ' + socket.client.conn.id);
    socket.emit('Oh hii!');

    socket.on('message', function (message) {
        console.log('Message from client on server side ' + message)
        io.emit('message', message);
    });
  });

  server.log('Server running at: ' + server.info.uri);
});


module.exports = server;
