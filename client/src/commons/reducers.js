import { loadData, errorData, clearErrors, setModalStatus, successData } from './routines';

const initialState = {
	isLoading: false,
	errorMessages: null,
	successMessages: null,
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
				errorMessages: payload,
				isLoading: false,
			};
		case successData.TRIGGER:
			return {
				...state,
				successMessages: payload,
				isLoading: false,
			};
		case clearErrors.TRIGGER:
			return {
				...state,
				errorMessages: null,
				successMessages: null,
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
