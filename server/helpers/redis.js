const redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://@redis:6379',
});

redisClient.on('error', (err) => console.log('Redis Client Error :', err));

module.exports = redisClient;
