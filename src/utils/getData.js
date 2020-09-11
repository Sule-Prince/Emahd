const getData = name => {
	const form = document.getElementsByTagName("form")[0];
	return form[name].value;
};

export default getData