export const setErrorsArray = (errors) => {
	return Object.keys(errors).reduce((acc, key) => {
		switch (key) {
			case 'name':
				return [...acc, { msg: 'Name is required' }];
			case 'email':
				return [...acc, { msg: 'Invalid email' }];
			case 'password':
				return [...acc, { msg: 'Password must contains min 5 characters' }];

			default:
				return acc;
		}
	}, []);
};
