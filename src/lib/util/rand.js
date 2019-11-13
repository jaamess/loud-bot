const rand = (min, max) => (Math.random() * (max - min)) + min;

const getRandomItem = (list, weight) => {
	const totalWeight = weight.reduce((prev, cur) => prev + cur);

	const randomNum = rand(0, totalWeight);
	let weightSum = 0;

	for (var i = 0; i < list.length; i++) {
		weightSum += weight[i];
		weightSum = +weightSum.toFixed(2);

		if (randomNum <= weightSum) {
			return list[i];
		}
	}

	// In theory this should never return
	return list[0];
};

exports.rand = rand;
exports.getRandomItem = getRandomItem;
