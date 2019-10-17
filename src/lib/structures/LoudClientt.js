const { Client } = require('klasa');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const config = require('../../../ecosystem.config.json');

class LoudClient extends Client {

    constructor(...args) {
        super(...args);

        this.CSV_HEADERS = [
            { id: 'discordTag', title: 'Full Discord Tag' },
            { id: 'uID', title: 'User ID' },
            { id: 'fName', title: 'Full Name' },
            { id: 'age', title: 'Age' },
            { id: 'rg', title: 'RG' },
            { id: 'mail', title: 'E-mail' },
            { id: 'ffu', title: 'Free Fire Username' },
            { id: 'gID', title: 'Game ID' },
            { id: 'currentRank', title: 'Current Rank' },
            { id: 'brazilian', title: 'Brazilian?' },
            { id: 'state', title: 'State' },
            { id: 'city', title: 'City' },
            { id: 'hasWorked', title: 'Has worked?' },
            { id: 'lastJob', title: 'Last job' },
            { id: 'currentlyStudying', title: 'Currently studying?' },
            { id: 'contentPerform', title: 'Has made content / performed before' },
            { id: 'languages', title: 'Languages' },
            { id: 'strenghtWeakness', title: 'Biggest strength and biggest weakness' },
            { id: 'canMove', title: 'Can move to LOUD\'s gamehouse?' },
            { id: 'twitter', title: 'Twitter handle' },
            { id: 'instagram', title: 'Instagram handle' },
            { id: 'facebook', title: 'Facebook username' },
            { id: 'stream', title: 'Stream platform username' },
            { id: 'youtube', title: 'Youtube channel' },
            { id: 'signupVideo', title: 'Signup video URL' }
        ]

        this.csv = this.generateCsvWriter();
    }

    generateCsvWriter(path = 'temp.csv') {
        return createCsvWriter({
            path,
            header: this.CSV_HEADERS
        })
    }

    saveCsvWriter(path = 'temp.csv') {
        this.csv = this.generateCsvWriter(path);
        return this;
    }
}

exports.LoudClient = LoudClient;
