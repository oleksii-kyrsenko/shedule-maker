import { normalizeKey } from '../../../helpers/normalizeKey';

export const columns = [
	{ title: '№ з/п', field: 'sequenceNumber' },
	{ title: 'Прізвище, ім’я, по батькові', field: 'fullName' },
	{
		title: 'Дата народження',
		field: 'dateOfBirth',
	},
	{
		title: 'РНОКПП',
		field: 'personalTaxNumber',
	},
	{
		title: 'Паспорт (серія, №)',
		field: 'passport',
	},
	{
		title: 'Медична довідка (серія, №)',
		field: 'medSertificate',
	},
	{
		title: 'Реєстрація місця проживання',
		field: 'adress',
	},
];

export const title = 'Студенти';

export const studentKeys = (key) => {
	switch (normalizeKey(key)) {
		case '№ з/п':
			return 'sequenceNumber';
		case 'Прізвище, ім я, по батькові':
			return 'fullName';
		case 'Дата народження':
			return 'dateOfBirth';
		case 'РНОКПП':
			return 'personalTaxNumber';
		case 'Паспорт (серія, №)':
			return 'passport';
		case 'Медична довідка (серія, №)':
			return 'medSertificate';
		case 'Реєстрація місця проживання':
			return 'adress';

		default:
			return key;
	}
};
