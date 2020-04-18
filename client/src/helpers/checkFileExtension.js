export const checkExtRegex = /\.(.+)$/;
export const types = ['xls', 'xlsx', 'csv'];
export const checkFileExtension = (re, types, string) => types.includes(re.exec(string)[1]);
