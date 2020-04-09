import { authUser, fetchAuthUser, createUser } from './routines';
import { logoutUser } from '../../commons/routines';

const initialState = {
	user: null,
	isAuth: false,
	token: null,
};

export const authReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case authUser.SUCCESS:
		case createUser.SUCCESS:
		case fetchAuthUser.SUCCESS:
			return {
				...state,
				...payload,
				isAuth: true,
			};
		case authUser.FAILURE:
		case fetchAuthUser.FAILURE:
		case createUser.FAILURE:
		case logoutUser.TRIGGER:
			localStorage.removeItem('token');
			return {
				...state,
				isAuth: false,
				user: null,
				token: null,
			};
		default:
			return state;
	}
};
