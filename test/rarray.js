const Redis = require('ioredis');
const config = require('../ecosystem.config.json');
const { serialize } = require('binarytf');
const { GoogleSpreadsheet } = require('google-spreadsheet-nextra');

class RedisArray {

	constructor(key) {
		// eslint-disable-next-line consistent-this
		const self = this;

		this.redis = new Redis({
			port: config.redis.port,
			host: config.redis.ip,
			family: 4,
			password: config.redis.pass,
			db: 0
		});
		this.key = key;
		this.data = [];

		this.FULL_BREAK = String.fromCharCode(0x00a6);
		this.SEP_BREAK = String.fromCharCode(0x250A);

		return new Proxy(this, {
			get(target, prop) {
				if (Number(prop) === prop && !(prop in target)) {
					return self.data[prop];
				}
				return target[prop];
			}
		});
	}

	async init(maxLength = 10000) {
		this.data = await this.redis.lrange(this.key, -maxLength, maxLength);
		return this;
	}

	async push(data) {
		data = JSON.stringify(data);
		this.data.push(data);
		await this.redis.rpush(this.key, data);
		return this;
	}

}

const rArray = new RedisArray('testArray');
const doc = new GoogleSpreadsheet('11kmCFNA3Lgi6zKV-Cptz7O8vFCaSh91yRFcTEV7mg-k');
const worksheetMap = new Map();

doc.useServiceAccountAuth(require('./GoogleKey.json'))
	.then(() => console.log('Authenticated'))
	.then(async () => {
		await rArray.init();
		doc.getInfo()
			.then((data) => worksheetMap.set(data.worksheets[0].title, data.worksheets[0]))
			.then(() => {
				worksheetMap.get('Signups').getCells({ 'min-row': 2, 'min-col': 25, 'max-row': 2, 'max-col': 2 })
					.then(async (data) => {
						await rArray.push({
							_formula: data[0]._formula,
							_numericValue: data[0]._numericValue,
							_value: data[0]._value,
							worksheetID: data[0].worksheetID,
							spreadsheetKey: data[0].spreadsheetKey,
							id: data[0].id,
							row: data[0].row,
							col: data[0].col,
							batchID: data[0].batchID
						});
						console.log(await rArray.redis.lrange(rArray.key, -100, 100));
					});
			})
			.catch(console.error.bind(this));
	})
	.catch(console.error.bind(this));
