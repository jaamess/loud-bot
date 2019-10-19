const { Collection } = require('discord.js');

class SheetMap extends Collection {

	async init(spreadsheet, sheet) {
		const info = await spreadsheet.getInfo();
		const worksheet = info.worksheets.find((val) => val.title === sheet);
		if (!worksheet) throw new ReferenceError('Invalid Worksheet title!');
		super.set(worksheet.title, worksheet);
		return worksheet;
	}

}

exports.SheetMap = SheetMap;
