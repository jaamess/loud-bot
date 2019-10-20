const { GoogleSpreadsheet, SpreedsheetCell } = require('google-spreadsheet-nextra');

const doc = new GoogleSpreadsheet('11kmCFNA3Lgi6zKV-Cptz7O8vFCaSh91yRFcTEV7mg-k');

const worksheetMap = new Map();

doc.useServiceAccountAuth(require('./GoogleKey.json'))
	.then(() => console.log('Authenticated'))
	.then(() => {
		doc.getInfo()
			.then((data) => worksheetMap.set(data.worksheets[0].title, data.worksheets[0]))
			.then(() => {
				const cell = new SpreedsheetCell(doc, doc.ssKey, worksheetMap.get('Signups').id, {});
				cell._needsSave = true;
			})
			.catch(console.error.bind(this));
	})
	.catch(console.error.bind(this));
