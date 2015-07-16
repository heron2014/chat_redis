var handlers = {

  home: function(request, reply) {
    var context = {message: 'anita'}; //at the moment context hardcoded
    reply.view('index', context);
  }
};

module.exports = handlers;