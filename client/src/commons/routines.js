import { createRoutine } from 'redux-saga-routines';

export const loading = createRoutine('LOADING');
export const errorData = createRoutine('ERROR_DATA');
export const clearErrors = createRoutine('CLEAR_ERRORS');
