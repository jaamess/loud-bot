import { readFile } from 'fs-nextra';
import fetch from 'chainfetch';

export default class Util {

    // eslint-disable-next-line
    public static URL_REGEX = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;

    private constructor() {
        throw new Error('y you do dis james');
    }

    public static isURL(str: string): boolean {
        return Util.URL_REGEX.test(str);
    }

    public static async parseImage(image: string | Buffer): Promise<Buffer> {
        if (typeof image === 'string' && Util.isURL(image)) return fetch.get(image).toBuffer().onlyBody();
        if (Buffer.isBuffer(image)) return image;
        return readFile(image);
    }

}
