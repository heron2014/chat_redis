var handlers = {

  home: function(request, reply) {
    var context = {
    	message: 'anita' //for now hardcoded
    }
    reply.view('index', context);
  },

  socket: function(request, reply) {
  	reply.file('./node_modules/socket.io-client/socket.io.js');
  }
};

module.exports = handlers;