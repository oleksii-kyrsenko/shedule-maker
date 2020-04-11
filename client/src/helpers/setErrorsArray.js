export const setErrorsArray = (errors) => {
	return Object.keys(errors).reduce((acc, key) => {
		switch (key) {
			case 'name':
				return [...acc, { msg: 'Name is required' }];
			case 'email':
				return [...acc, { msg: 'Invalid email' }];
			case 'password':
				return [...acc, { msg: 'Password must contains min 5 characters' }];
			case 'start':
				return [...acc, { msg: 'Start date is required' }];
			case 'end':
				return [...acc, { msg: 'End date is required' }];
			case 'category':
				return [...acc, { msg: 'Group category  is required' }];

			default:
				return acc;
		}
	}, []);
};
