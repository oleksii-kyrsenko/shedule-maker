export const normalizeKey = (key) =>
	key
		.trim()
		.split(' ')
		.filter((item) => item == 0 || !!item)
		.join(' ');

export const normalizeSerial = (serial) =>
	serial
		.trim()
		.split(' ')
		.filter((item) => item == 0 || !!item)
		.join('');

export const normalizeDate = (date) => new Date(date).toLocaleDateString();
