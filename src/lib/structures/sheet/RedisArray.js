// TEMP: Just here for intelliSense
const Redis = require('ioredis');

class RedisArray {

	constructor(key) {
		// eslint-disable-next-line consistent-this
		const self = this;


		this.redis = new Redis();
		this.key = key;
		this.data = [];

		return new Proxy(this, {
			get(target, prop) {
				if (Number(prop) === prop && !(prop in target)) {
					return self.data[prop];
				}
				return target[prop];
			}
		});
	}

	async init(maxLength = 1000) {
		this.data = await this.redis.lrange(this.key, -1, maxLength);
		return this;
	}

}

exports.RedisArray = RedisArray;
