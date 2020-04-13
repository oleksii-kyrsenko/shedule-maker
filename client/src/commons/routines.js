import { createRoutine } from 'redux-saga-routines';

export const loadData = createRoutine('LOAD_DATA');
export const errorData = createRoutine('ERROR_DATA');
export const successData = createRoutine('SUCCESS_DATA');
export const clearMessages = createRoutine('CLEAR_MESSAGES');
export const logoutUser = createRoutine('LOGOUT_USER');
export const setModalStatus = createRoutine('SET_MODAL_STATUS');
export const setDialogStatus = createRoutine('SET_DIALOG_STATUS');

