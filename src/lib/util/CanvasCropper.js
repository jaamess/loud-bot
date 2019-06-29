const sizeOf = require('image-size');
const Util = require('./Util');
const { Canvas } = require('canvas-constructor');

class CanvasCropper {

	static async crop(image) {
		// Well just turn a URL, path or buffer into a valid buffer for Canvas
		image = await Util.parseImage(image);
		// Get the images size in width and height so that we can calculate relative positions later
		const dimensions = sizeOf(image);

		const cWidth = dimensions.width / 4;
		const cHeight = (dimensions.height > dimensions.width) ? dimensions.height / 8 : dimensions.height / 4;
		const iWidthOffset = -((dimensions.width / 8) * 5);
		const iHeightOffset = -((dimensions.height / 16) * 7);

		// Create a new canvas which has a 4th of the width and height of the original image
		const result = new Canvas(cWidth, cHeight)
			// Insert the image at a offset using the relative devidites of the width and height. Don't ask me how I got these. It was alot of trial and error.
			.addImage(image, iWidthOffset, iHeightOffset, dimensions.width, dimensions.height);

		return result.toBuffer();
	}

}

module.exports = CanvasCropper;
