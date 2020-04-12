export const setErrorsArray = (errors) => {
	return Object.values(errors).reduce((acc, value) => {
		return [...acc, value];
	}, []);
};
