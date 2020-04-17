export const setErrorsArray = (errors) =>
	Object.values(errors).reduce((acc, value) => [...acc, value], []);
