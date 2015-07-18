var Hapi = require('hapi'),
  server = new Hapi.Server(),
  path = require('path'),
  handlebars = require('handlebars'),
  routes = require('./routes.js'),
  SocketIO = require('socket.io'),
  redisClient = require('./redis_connect.js');

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

    socket.on('name', function(name) {
      redisClient.HSET('users', socket.client.conn.id, name);
        console.log(socket.client.conn.id, name + 'joined');
        io.emit('name', name);
    });

    socket.on('message', function (message, etc) {
      console.log('Message from client on server side ' + message);

      redisClient.HGET('users', socket.client.conn.id, function(err, name) {
        if(err) {
          console.log(err);
        }

        console.log(name);

        var obj = { //each message is stored in an object
          msg: message,
          timestamp: new Date().getTime(),
          name: name
        };

        var strObj = JSON.stringify(obj);
        redisClient.RPUSH('chat', strObj);
        console.log(strObj);

        io.emit('message', strObj); 
      });
    });
  });

  server.log('Server running at: ' + server.info.uri);
});


module.exports = server;
