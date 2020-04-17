import { normalizeKey } from '../../../helpers/normalizeString';

export const columns = [
	{ title: '№ з/п', field: 'sequenceNumber' },
	{ title: 'Прізвище, ім’я, по батькові', field: 'fullName' },
	{
		title: 'Дата народження',
		field: 'dateOfBirth',
	},
	{
		title: 'Посвідчення водія',
		field: 'drivingLicense',
	},
	{
		title: 'Вид підготовки',
		field: 'skills',
	},
	{
		title: 'Особова медична книжка',
		field: 'healthBook',
	},
	{
		title: 'Дані про атестат спеціаліста',
		field: 'atestat',
	},
	{
		title: 'Освіта',
		field: 'education',
	},
	{
		title: 'Стаж водія',
		field: 'experience',
	},
];

export const title = 'Інструктори';

export const instructorKeys = (key) => {
	switch (normalizeKey(key)) {
		case '№ п/п':
			return 'sequenceNumber';
		case 'Прізвище, ім’я, по-батькові':
			return 'fullName';
		case 'Дата народження':
			return 'dateOfBirth';
		case 'Вид підготовки':
			return 'skills';
		case 'Дані про атестат спеціаліста':
			return 'atestat';
		case 'Освіта':
			return 'education';
		case 'Особова медична книжка':
			return 'healthBook';
		case 'Посвідчення водія':
			return 'drivingLicense';
		case 'Стаж водія':
			return 'experience';

		default:
			return key;
	}
};
