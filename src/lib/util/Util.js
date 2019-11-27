const fsn = require('fs-nextra');
const fetch = require('chainfetch');

class Util {

    static isURL(str) {
        return Util.URL_REGEX.test(str);
    }

    static async parseImage(image) {
        if (Util.isURL(image)) return fetch.get(image).toBuffer().onlyBody();
        if (Buffer.isBuffer(image)) return image;
        return fsn.readFile(image);
    }

}

// eslint-disable-next-line
Util.URL_REGEX = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;

module.exports = Util;
