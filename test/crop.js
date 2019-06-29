const sizeOf = require('image-size');
const fsn = require('fs-nextra');
const { Canvas } = require('canvas-constructor');

fsn.readFile('./unknown2.png').then(async (buff) => {
	const dimensions = sizeOf(buff);

	console.log(dimensions.width, dimensions.height);

	const result = new Canvas(dimensions.width / 8, dimensions.height / 8)
		.addImage(buff, -((dimensions.width / 16) * 10), -((dimensions.height / 32) * 17), dimensions.width, dimensions.height);

	fsn.writeFile('result.png', result.toBuffer());
});
