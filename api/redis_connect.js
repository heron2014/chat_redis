var redis = require('redis');
var url = require('url');
var redisURL = url.parse(process.env.REDISCLOUD_URL);
var redisClient = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
redisClient.auth(redisURL.auth.split(":")[1]);

redisClient.set('Redis-Status', 'Working');
redisClient.get('Redis-Status', function(err, reply) {
  console.log('Redis-Status: ' + reply.toString());
});  

module.exports = redisClient;