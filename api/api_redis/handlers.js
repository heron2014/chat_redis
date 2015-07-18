// var Hapi = require('hapi'),
//   server = new Hapi.Server(),
//   redisClient = require('./redis_connect.js'),
//   SocketIO = require('socket.io'),
//   io;
// // var io = SocketIO.listen(server.listener);
// console.log(SocketIO);
// function chat_handler(socket) {
//   // var io = SocketIO.listen(server.listener);
//   // console.log('this is client.conn.id ' + socket.client.conn.id);
//   // socket.emit('Oh hii!');

//   socket.on('name', function(name) {
//     var io = SocketIO.listen(server.listener);
//     redisClient.HSET('users', socket.client.conn.id, name);
//       console.log(socket.client.conn.id, name + 'joined');
//       console.log(io);
//       io.emit('name', name);
//   });

//   socket.on('message', function (message) {
//     console.log('Message from client on server side ' + message);

//     redisClient.HGET('users', socket.client.conn.id, function(err, name) {
//       if(err) {
//         console.log(err);
//       }

//       console.log(name);

//       var obj = { //each message is stored in an object
//         msg: message,
//         timestamp: new Date().getTime(),
//         name: name
//       };

//       var strObj = JSON.stringify(obj);
//       redisClient.RPUSH('chat', strObj);
//       console.log(strObj);

//       io.emit('message', strObj); 
//     });
//   });

//   socket.on('error', function (err) { 
//     console.error(err.stack);
//   });

//   }

//   module.exports = chat_handler;