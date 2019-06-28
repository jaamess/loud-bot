const fetch = require('chainfetch');
const sizeOf = require('image-size');
const { Canvas } = require('canvas-constructor');

class CanvasCropper {

	static async crop(image) {
		image = await CanvasCropper._parseImage(image);
		const dimensions = sizeOf(image);

		const result = new Canvas(dimensions.width / 4, dimensions.height / 4)
			.addImage(image, -((dimensions.width / 8) * 5), -((dimensions.height / 16) * 7), dimensions.width, dimensions.height);

		return result.toBuffer();
	}

	static async _parseImage(image) {
		if (CanvasCropper.isURL(image)) return fetch.get(image).toBuffer().onlyBody();
		if (Buffer.isBuffer(image)) return image;
		return new Buffer();
	}

}

// eslint-disable-next-line
CanvasCropper.URL_REGEX = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;

module.exports = CanvasCropper;
