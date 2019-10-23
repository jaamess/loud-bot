// TEMP: Just here for intelliSense
const Redis = require('ioredis');

const { SpreedsheetCell } = require('google-spreadsheet-nextra');

class RedisCellArray {

	constructor(key, sheet) {
		// eslint-disable-next-line consistent-this
		const self = this;


		this.redis = new Redis();
		this.sheet = sheet;
		this.key = key;
		this.data = [];

		return new Proxy(this, {
			get(target, prop) {
				if (Number(prop) === prop && !(prop in target)) {
					if (!self.data[prop]) return undefined;
					const cellData = self.data[prop];
					const cell = new SpreedsheetCell(
						self.sheet,
						cellData.spreadsheetKey,
						cellData.worksheetID,
						{
							'gs:cell': {
								$: {
									row: cellData.row,
									col: cellData.col
								}
							}
						}
					);
					cell._formula = cellData._formula;
					cell._numericValue = cellData._numericValue;
					cell._value = cellData._value;

					cell.value = cellData.value;

					return cell;
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
		data = {
			_formula: data._formula,
			_numericValue: data._numericValue,
			_value: data._value,
			value: data.value,
			worksheetID: data.worksheetID,
			spreadsheetKey: data.spreadsheetKey,
			id: data.id,
			row: data.row,
			col: data.col,
			batchID: data.batchID
		};
		this.data.push(data);
		data = JSON.stringify(data);
		await this.redis.rpush(this.key, data);
		return this;
	}

	async clear() {
		await this.redis.del([this.key]);
		this.data = [];
		return this;
	}

}

exports.RedisCellArray = RedisCellArray;
