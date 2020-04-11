import { loadData, errorData, clearErrors, setModalStatus } from './routines';

const initialState = {
	isLoading: false,
	errors: null,
	isModalOpen: false,
};

export const commonsReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case loadData.REQUEST:
			return {
				...state,
				isLoading: true,
			};

		case loadData.FULFILL:
			return {
				...state,
				isLoading: false,
			};

		case errorData.TRIGGER:
			return {
				...state,
				errors: payload,
				isLoading: false,
			};
		case clearErrors.TRIGGER:
			return {
				...state,
				errors: null,
			};
		case setModalStatus.TRIGGER:
			return {
				...state,
				isModalOpen: payload,
			};

		default:
			return state;
	}
};
