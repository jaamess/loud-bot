const { Client } = require('klasa');
const Redis = require('ioredis');

const config = require('../../../ecosystem.config.json');

class LoudClient extends Client {

	constructor(...args) {
		super(...args);

		this.redis = new Redis({
			port: config.redis.port,
			host: config.redis.ip,
			family: 4,
			password: config.redis.pass,
			db: 0
		});
	}

}

exports.LoudClient = LoudClient;
