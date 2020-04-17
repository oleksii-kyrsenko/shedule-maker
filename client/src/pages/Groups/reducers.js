import {
	fetchAllGroups,
	createGroup,
	editGroup,
	fetchGroupById,
	addGroupStudentsFromFile,
	addGroupInstructorsFromFile,
	addGroupCarsFromFile
} from './routines';

import { logoutUser } from '../../commons/routines';

const initialState = {
	groups: null,
	group: null,
};

export function groupsReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case fetchAllGroups.REQUEST:
		case fetchAllGroups.FAILURE:
			return {
				...state,
				groups: null,
			};

		case fetchAllGroups.SUCCESS:
			return {
				...state,
				groups: payload,
			};
		case createGroup.REQUEST:
		case editGroup.REQUEST:
		case fetchGroupById.REQUEST:
		case addGroupStudentsFromFile.REQUEST:
		case addGroupInstructorsFromFile.REQUEST:
		case addGroupCarsFromFile.REQUEST:
			return {
				...state,
				group: null,
			};

		case createGroup.SUCCESS:
		case editGroup.SUCCESS:
		case fetchGroupById.SUCCESS:
		case addGroupStudentsFromFile.SUCCESS:
		case addGroupInstructorsFromFile.SUCCESS:
		case addGroupCarsFromFile.SUCCESS:
			return {
				...state,
				group: payload,
			};

		case logoutUser.TRIGGER:
			return {
				...state,
				groups: null,
				group: null,
			};

		default:
			return state;
	}
}
