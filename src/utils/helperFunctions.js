export const objectToArray = obj => {
	const arrayData = [];

	for (let key in obj) {
		let length = arrayData.length;
		arrayData[length] = [];
		arrayData[length][0] = key;
		arrayData[length][1] = obj[key];
	}

	return arrayData;
};
