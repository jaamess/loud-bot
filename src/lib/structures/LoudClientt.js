const { Client } = require('klasa');
const { GoogleSpreadsheet } = require('google-spreadsheet-nextra');

const config = require('../../../ecosystem.config.json');

class LoudClient extends Client {

    constructor(...args) {
        super(...args);

        this.spreadsheet = new GoogleSpreadsheet(config.sheet.spreadsheetKey, config.sheet.authID);
    }
}

exports.LoudClient = LoudClient;
