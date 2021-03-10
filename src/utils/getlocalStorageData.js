export const getLocalStorageData = name => {
	let data = null;

	if (localStorage.getItem(name)) {
		data = localStorage.getItem(name);
		return data;
	}

	return data;
};
