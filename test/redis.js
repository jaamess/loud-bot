const Redis = require('ioredis');
const config = require('../ecosystem.config.json');

const redis = new Redis({
	port: config.redis.port,
	host: config.redis.ip,
	family: 4,
	password: config.redis.pass,
	db: 0
});

redis.ping().then(console.log.bind(this));

redis.rpush('test123', 'heh3').then(console.log.bind(this));

redis.lrange('test123', -100, 100).then(console.log.bind(this));
