const { SpreedsheetCell } = require('google-spreadsheet-nextra');

class RedisCellArray {

	constructor(key, sheet, redis) {
		// eslint-disable-next-line consistent-this
		const self = this;


		this.redis = redis;
		this.sheet = sheet;
		this.key = key;
		this.data = [];

		return new Proxy(this, {
			get(target, prop) {
				if ((typeof prop === 'number') && (Number(prop) === prop) && !(prop in target)) {
					if (!self.data[prop]) return undefined;
					const cellData = self.data[prop];
					return self.formCell(cellData);
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

	formCell(data) {
		const cell = new SpreedsheetCell(
			this.sheet,
			data.spreadsheetKey,
			data.worksheetID,
			{
				'gs:cell': {
					$: {
						row: data.row,
						col: data.col
					}
				}
			}
		);
		cell._formula = data._formula;
		cell._numericValue = data._numericValue;
		cell._value = data._value;

		cell.value = data.value;

		return cell;
	}

	formedCells() {
		// eslint-disable-next-line consistent-this
		const self = this;
		return this.data.map((val) => self.formCell(val));
	}

}

exports.RedisCellArray = RedisCellArray;
