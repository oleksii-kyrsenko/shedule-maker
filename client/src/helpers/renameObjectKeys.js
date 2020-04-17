export const renameObjectKeys = (data, keys) =>
	data.map((object) =>
		Object.fromEntries(Object.entries(object).map(([key, value], i) => [(key = keys(key)), value]))
	);