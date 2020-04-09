export const renameObjectKeys = (arrayOfOjects, arrayOfKeys) =>
	arrayOfOjects.map((object) =>
		Object.fromEntries(
			Object.entries(object).map(([key, value], i) => [(key = arrayOfKeys[i]), value])
		)
	);
