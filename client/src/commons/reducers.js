import { loading, errorData, clearErrors } from './routines';

const initialState = {
	isLoading: false,
	errors: null,
};

export function commonsReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case loading.REQUEST:
			return {
				...state,
				isLoading: true,
			};

		case loading.FULFILL:
			return {
				...state,
				isLoading: false,
			};

		case errorData.TRIGGER:
			return {
				...state,
				errors: payload,
			};
		case clearErrors.TRIGGER:
			return {
				...state,
				errors: null,
			};

		default:
			return state;
	}
}
