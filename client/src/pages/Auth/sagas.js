import axios from 'axios';
import { put, all, takeEvery } from 'redux-saga/effects';
import { authUser, fetchAuthUser, createUser } from './routines';
import { loadData, errorData, clearMessages, successData } from '../../commons/routines';
import { setAuthToken } from '../../helpers/setAuthToken';

function* authUserSaga({ payload }) {
	try {
		yield put(loadData.request());
		const response = yield axios.post('/api/auth', payload);
		const { token, success } = response.data;
		setAuthToken(token);
		yield all([
			put(authUser.success({ token })),
			put(fetchAuthUser()),
			put(successData( success )),
		]);
	} catch (error) {
		const errors = error.response.data.errors;
		yield all([put(errorData.trigger(errors)), put(authUser.failure()), put(loadData.fulfill())]);
	} finally {
		yield put(clearMessages.trigger());
	}
}

function* fetchAuthUserSaga() {
	try {
		const response = yield axios.get('/api/auth');
		yield put(fetchAuthUser.success({ user: response.data }));
	} catch (error) {
		const errors = error.response.data.errors;
		yield all([put(errorData.trigger(errors)), put(fetchAuthUser.failure())]);
	} finally {
		yield all([put(loadData.fulfill()), put(clearMessages.trigger())]);
	}
}

function* createUserSaga({ payload }) {
	try {
		yield put(loadData.request());
		const response = yield axios.post('/api/users', payload);
		const { token, success } = response.data;
		setAuthToken(token);
		yield all([put(createUser.success({ token })), put(fetchAuthUser()),put(successData( success )),]);
	} catch (error) {
		const errors = error.response.data.errors;
		yield all([put(errorData.trigger(errors)), put(createUser.failure()), put(loadData.fulfill())]);
	} finally {
		yield put(clearMessages.trigger());
	}
}

function* authUserWatcherSaga() {
	yield takeEvery(authUser.TRIGGER, authUserSaga);
}

function* fetchAuthUsertWatcherSaga() {
	yield takeEvery(fetchAuthUser.TRIGGER, fetchAuthUserSaga);
}

function* createUserWatcherSaga() {
	yield takeEvery(createUser.TRIGGER, createUserSaga);
}

export function* authSagas() {
	yield all([authUserWatcherSaga(), fetchAuthUsertWatcherSaga(), createUserWatcherSaga()]);
}
