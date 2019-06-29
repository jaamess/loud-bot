const sizeOf = require('image-size');
const Util = require('./Util');
const { Canvas } = require('canvas-constructor');

class CanvasCropper {

	static async crop(image, retry = 0) {
		// Well just turn a URL, path or buffer into a valid buffer for Canvas
		image = await Util.parseImage(image);
		// Get the images size in width and height so that we can calculate relative positions later
		const dimensions = sizeOf(image);

		const sizes = CanvasCropper.retryScores(dimensions.width, dimensions.height, retry);

		// Create a new canvas which has a 4th of the width and height of the original image
		const result = new Canvas(sizes[0], sizes[1])
			// Insert the image at a offset using the relative devidites of the width and height. Don't ask me how I got these. It was alot of trial and error.
			.addImage(image, sizes[2], sizes[3], dimensions.width, dimensions.height);

		return result.toBuffer();
	}

	static retryScores(width, height, retry) {
		switch (retry) {
			case 0: return [width / 4, height / 4, -((width / 8) * 5), -((height / 16) * 7)];
			case 1: return [width / 4, height / 8, -((width / 8) * 5), -((height / 16) * 7)];
			case 2: return [width / 8, height / 8, -((width / 16) * 10), -((height / 32) * 17)];
			default: return CanvasCropper.retryScores(width, height, 0);
		}
	}

}

module.exports = CanvasCropper;
