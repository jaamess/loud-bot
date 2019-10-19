const { SheetMap } = require('./SheetMap');

class SpreadsheetWriter {

	constructor(spreadsheet) {
		this.spreadsheet = spreadsheet;

		this.worksheets = new SheetMap();
		this.sheet = null;

		this.initialized = false;

		this.cellsToUpdate = new Array();
	}

	async initialize() {
		this.worksheets.init(this.spreadsheet, 'Signups');
		this.sheet = this.worksheets.first();
		this.initialized = true;
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

	async changeCellValue(input, row, col, update) {
		const cell = this.sheet.getCells({ 'min-row': row, 'max-row': row, 'min-col': col, 'max-col': col });
		cell.value = input;
		this.cellsToUpdate.push(cell);
		if (update === true) await this.updateCells();
		return this;
	}

	async updateCells() {
		await this.sheet.bulkUpdateCells(this.cellsToUpdate);
		this.cellsToUpdate = new Array();
		return this;
	}
}

exports.SpreadsheetWriter = SpreadsheetWriter;
