import axios from 'axios';
import { put, all, takeEvery } from 'redux-saga/effects';

import { fetchAllGroups, createGroup, deleteGroup, editGroup, fetchGroupById } from './routines';
import { loadData, errorData, successData } from '../../commons/routines';

function* fetchAllGroupsSaga() {
	try {
		yield all([put(loadData.request()), put(fetchAllGroups.request())]);
		const response = yield axios.get('/api/groups');
		yield put(fetchAllGroups.success(response.data));
	} catch (error) {
		const errors = error.response.data.errors;
		yield all([put(errorData.trigger(errors))]);
	} finally {
		yield put(loadData.fulfill());
	}
}

function* createGroupSaga({ payload }) {
	try {
		yield all([put(loadData.request()), put(createGroup.request())]);
		const response = yield axios.post('/api/groups', payload);
		yield all([
			put(createGroup.success(response.data.group)),
			put(fetchAllGroups()),
			put(successData(response.data.success)),
		]);
	} catch (error) {
		const errors = error.response.data.errors;
		yield all([put(errorData.trigger(errors))]);
	}
}

function* deleteGroupSaga({ payload }) {
	try {
		yield all([put(loadData.request())]);
		const response = yield axios.delete(`/api/groups/${payload}`);
		yield put(successData(response.data.success));
	} catch (error) {
		const errors = error.response.data.errors;
		yield all([put(errorData.trigger(errors))]);
	} finally {
		yield put(fetchAllGroups());
	}
}

function* editGroupSaga({ payload }) {
	try {
		yield all([put(loadData.request()), put(editGroup.request())]);
		const { id, data } = payload;
		const response = yield axios.put(`/api/groups/${id}`, data);
		yield all([
			put(editGroup.success(response.data.group)),
			put(fetchAllGroups()),
			put(successData(response.data.success)),
		]);
	} catch (error) {
		const errors = error.response.data.errors;
		yield all([put(errorData.trigger(errors))]);
	}
}

function* fetchGroupByIdSaga({ payload }) {
	try {
		yield all([put(loadData.request()), put(fetchGroupById.request())]);
		const response = yield axios.put(`/api/groups/${payload}`);
		yield all([put(fetchGroupById.success(response.data))]);
	} catch (error) {
		const errors = error.response.data.errors;
		yield all([put(errorData.trigger(errors))]);
	} finally {
		yield put(loadData.fulfill());
	}
}

function* fetchAllGroupsWatcherSaga() {
	yield takeEvery(fetchAllGroups.TRIGGER, fetchAllGroupsSaga);
}

function* createGroupWatcherSaga() {
	yield takeEvery(createGroup.TRIGGER, createGroupSaga);
}

function* deleteGroupWatcherSaga() {
	yield takeEvery(deleteGroup.TRIGGER, deleteGroupSaga);
}

function* editGroupWatcherSaga() {
	yield takeEvery(editGroup.TRIGGER, editGroupSaga);
}

function* fetchGroupByIdWatcherSaga() {
	yield takeEvery(fetchGroupById.TRIGGER, fetchGroupByIdSaga);
}

export function* groupsSagas() {
	yield all([
		fetchAllGroupsWatcherSaga(),
		createGroupWatcherSaga(),
		deleteGroupWatcherSaga(),
		editGroupWatcherSaga(),
		fetchGroupByIdWatcherSaga(),
	]);
}
