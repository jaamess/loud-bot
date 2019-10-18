const { GoogleSpreadsheet } = require('google-spreadsheet-nextra');

const doc = new GoogleSpreadsheet('11kmCFNA3Lgi6zKV-Cptz7O8vFCaSh91yRFcTEV7mg-k');

const worksheetMap = new Map();

doc.useServiceAccountAuth(require('./GoogleKey.json'))
	.then(() => console.log('Authenticated'))
	.then(() => {
		doc.getInfo()
			.then((data) => worksheetMap.set(data.worksheets[0].title, data.worksheets[0]))
			.then(() => {
				worksheetMap.get('Signups').getRows()
					.then(console.log.bind(this));
			})
			.catch(console.error.bind(this));
	})
	.catch(console.error.bind(this));
