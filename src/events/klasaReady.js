const { Event } = require('klasa');
const Redis = require('ioredis');
const { GoogleSpreadsheet } = require('google-spreadsheet-nextra');
const { SpreadsheetWriter } = require('../lib/structures/sheet/SpreadsheetWriter')

const config = require('../../ecosystem.config.json');
const GoogleKey = require('../lib/GoogleKey.json')

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'klasaReady',
			event: 'klasaReady',
			enabled: true,
			once: true
		});
	}

	async run() {

		this.client.redis = new Redis({
			port: config.redis.port,
			host: config.redis.ip,
			family: 4,
			password: config.redis.pass,
			db: 0
		});

		this.client.spreadsheet = new GoogleSpreadsheet(config.ssKey);
		await this.client.spreadsheet.useServiceAccountAuth(GoogleKey);

		this.client.writer = new SpreadsheetWriter(this.client);
		await this.client.writer.initialize();

	}

};
