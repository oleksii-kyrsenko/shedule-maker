export const normalizeKey = (key) =>
	key
		.trim()
		.split(' ')
		// eslint-disable-next-line
		.filter((item) => item == 0 || !!item)
		.join(' ');

export const normalizeSerial = (serial) =>
	serial
		.trim()
		.split(' ')
		// eslint-disable-next-line
		.filter((item) => item == 0 || !!item)
		.join('');

export const normalizeCategories = (categories) => categories;

export const normalizeDate = (date) => new Date(date).toLocaleDateString();
