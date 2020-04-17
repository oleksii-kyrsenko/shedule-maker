export const normalizeKey = (key) =>
	key
		.trim()
		.split(' ')
		.filter((item) => item == 0 || !!item)
		.join(' ');
