var Hapi = require('hapi'),
  server = new Hapi.Server(),
  path = require('path'),
  handlebars = require('handlebars'),
  routes = require('./routes.js'),
  SocketIO = require('socket.io'),
  redis = require('redis'),
  redis_client = require('./redis_connect.js');


// redis_client.set('Redis-Status', 'Working');
// redis_client.get('Redis-Status', function(err, reply) {
//   console.log('Redis-Status: ' + reply);
// });  
  

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
        console.log('Message from client on server side ' + message);

        var obj = { //each message is stored in an object
          msg: message,
          timestamp: new Date().getTime(),
          u: socket.client.conn.id
        };
        redis_client.RPUSH('chat', JSON.stringify(obj));
        console.log('after obj redis message is ' + message);

        io.emit('message', message);
    });
  });

  server.log('Server running at: ' + server.info.uri);
});


module.exports = server;
