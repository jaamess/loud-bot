const sizeOf = require('image-size');
const fsn = require('fs-nextra');
const { Canvas } = require('canvas-constructor');

fsn.readFile('./unknown4.png').then(async (buff) => {
	const dimensions = sizeOf(buff);

	console.log(dimensions.width, dimensions.height);

	const result = new Canvas(dimensions.width / 4, dimensions.height / 4)
		.addImage(buff, -((dimensions.width / 8) * 5), -((dimensions.height / 16) * 7), dimensions.width, dimensions.height);

	fsn.writeFile('result.png', result.toBuffer());
});
