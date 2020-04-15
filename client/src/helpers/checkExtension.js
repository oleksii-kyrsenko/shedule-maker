export const checkExtRegex = /\.(.+)$/;
export const types = ['xls', 'xlsx', 'csv'];
export const checkFileExtension = (re, types, string) => {
	return types.includes(re.exec(string)[1]);
};
