import { createRoutine } from 'redux-saga-routines';

export const fetchAllGroups = createRoutine('FETCH_ALL_GROUPS');
export const fetchGroupById = createRoutine('FETCH_GROUP_BY_ID');
export const createGroup = createRoutine('CREATE_GROUP');
export const editGroup = createRoutine('EDIT_GROUP');
export const deleteGroup = createRoutine('DELETE_GROUP');
export const addGroupStudentsFromFile = createRoutine('ADD_GROUP_STUDENTS_FROM_FILE');
export const addGroupInstructorsFromFile = createRoutine('ADD_GROUP_INSTRUCTORS_FROM_FILE');
export const addGroupCarsFromFile = createRoutine('ADD_GROUP_CARS_FROM_FILE');