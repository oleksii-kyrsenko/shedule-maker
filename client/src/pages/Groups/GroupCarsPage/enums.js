import { normalizeKey } from '../../../helpers/normalizeKey';

export const columns = [
	{ title: '№ з/п', field: 'sequenceNumber' },
	{ title: 'Марка транспортного засобу', field: 'brand' },
	{
		title: ' Категорія ТЗ',
		field: 'category',
	},
	{
		title:
			'Належність (у разі оренди вказати орендодавця, номер договору оренди, його дату та на який термін укладено)',
		field: 'owner',
	},
	{
		title: 'Номерний знак',
		field: 'number',
	},
	{
		title: 'Протокол перевірки технічного стану ТЗ, його номер та дата чергового проходження ОТК',
		field: 'protocol',
	},
	{
		title: 'Рік випуску',
		field: 'year',
	},
];

export const title = 'Автомобілі';

export const carKeys = (key) => {
	switch (normalizeKey(key)) {
		case '№ п/п':
			return 'sequenceNumber';
		case 'Марка транспортного засобу':
			return 'brand';
		case 'Категорія ТЗ':
			return 'category';
		case 'Належність (у разі оренди вказати орендодавця, номер договору оренди, його дату та на який термін укладено)':
			return 'owner';
		case 'Номерний знак':
			return 'number';
		case 'Протокол перевірки технічного стану ТЗ, його номер та дата чергового проходження ОТК':
			return 'protocol';
		case 'Рік випуску':
			return 'year';

		default:
			return key;
	}
};
