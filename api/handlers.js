var handlers = {

  home: function(request, reply) {
    var context = {
    	message: 'anita' //for now hardcoded
    }
    reply.view('index', context);
  }
};

module.exports = handlers;