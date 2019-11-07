const { SheetMap } = require('./SheetMap');
// const { RedisCellArray } = require('./RedisCellArray');

class SpreadsheetWriter {

	constructor(client) {
		this.spreadsheet = client.spreadsheet;
		this.redis = client.redis;
		this.client = client;

		this.worksheets = new SheetMap();
		this.sheet = null;

		this.innit = false;

		// this.cellsToUpdate = new RedisCellArray('spreadsheetCells', this.spreadsheet, this.redis);
		this.cellsToUpdate = [];
	}

	async initialize() {
		await this.worksheets.init(this.spreadsheet, 'Signups');
		// await this.cellsToUpdate.init();
		this.sheet = this.worksheets.first();
		this.innit = true;
		return this.sheet;
	}

	async setDiscordTag(input, row, update) {
		return this.changeCellValue(input, row, 1, update);
	}

	async setUserID(input, row, update) {
		return this.changeCellValue(input, row, 2, update);
	}

	async setFullName(input, row, update) {
		return this.changeCellValue(input, row, 3, update);
	}

	async setAge(input, row, update) {
		return this.changeCellValue(input, row, 4, update);
	}

	async setEmancipated(input, row, update) {
		return this.changeCellValue(input, row, 5, update);
	}

	async setRG(input, row, update) {
		return this.changeCellValue(input, row, 6, update);
	}

	async setEmail(input, row, update) {
		return this.changeCellValue(input, row, 7, update);
	}

	async setFFU(input, row, update) {
		return this.changeCellValue(input, row, 8, update);
	}

	async setGameID(input, row, update) {
		return this.changeCellValue(input, row, 9, update);
	}

	async setCurrentRank(input, row, update) {
		return this.changeCellValue(input, row, 10, update);
	}

	async changeCellValue(input, row, col, update = false) {
		const [cell] = await this.sheet.getCells({ 'min-row': row, 'max-row': row, 'min-col': col, 'max-col': col, 'return-empty': true });
		cell.value = input;
		this.cellsToUpdate.push(cell);
		if (update === true) await this.updateCells();
		return this;
	}

	async updateCells() {
		// await this.sheet.bulkUpdateCells(this.cellsToUpdate.formedCells());
		await this.sheet.bulkUpdateCells(this.cellsToUpdate);
		this.cellsToUpdate = [];
		// await this.cellsToUpdate.clear();
		return this;
	}

}

exports.SpreadsheetWriter = SpreadsheetWriter;
