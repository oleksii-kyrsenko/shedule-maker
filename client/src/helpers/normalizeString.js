export const normalizeKey = (key) =>
	key
		.trim()
		.split(' ')
		// eslint-disable-next-line
		.filter((item) => !!item)
		.join(' ');

export const normalizeSerial = (serial) =>
	serial
		.trim()
		.split(' ')
		// eslint-disable-next-line
		.filter((item) => !!item)
		.join('');

export const normalizeCategories = (categories) => categories;

export const normalizeDate = (date) => new Date(date).toLocaleDateString();
