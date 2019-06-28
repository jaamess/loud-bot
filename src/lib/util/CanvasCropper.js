const sizeOf = require('image-size');
const Util = require('./Util');
const { Canvas } = require('canvas-constructor');

class CanvasCropper {

	static async crop(image) {
		image = await Util.parseImage(image);
		const dimensions = sizeOf(image);

		const result = new Canvas(dimensions.width / 4, dimensions.height / 4)
			.addImage(image, -((dimensions.width / 8) * 5), -((dimensions.height / 16) * 7), dimensions.width, dimensions.height);

		return result.toBuffer();
	}

}

module.exports = CanvasCropper;
