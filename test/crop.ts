import sizeOf from 'image-size';
import fsn from 'fs-nextra';
import { Canvas } from 'canvas-constructor';

fsn.readFile('./unknown2.png').then(async (buff: Buffer) => {
	const dimensions = sizeOf(buff);

	console.log(dimensions.width, dimensions.height);

	const result = new Canvas(dimensions.width / 8, dimensions.height / 8)
		.addImage(buff, -((dimensions.width / 16) * 10), -((dimensions.height / 32) * 17), dimensions.width, dimensions.height) as Canvas

	fsn.writeFile('result.png', result.toBuffer());
});
