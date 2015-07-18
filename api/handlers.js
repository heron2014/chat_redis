var redisClient = require('./api_redis/redis_connect.js');

var handlers = {

  home: function(request, reply) {
    var context = {
      message: 'anita' //for now hardcoded
    }
    reply.view('index', context);
  },

  loadAllMessages: function(request, reply) {
    redisClient.lrange('chat', 0, -1, function(err, data) { // from 0 -1 means all
    if(err) {
      console.log(err);
    }

    console.log(data);
    reply(data);
  });
  }
};

module.exports = handlers;


