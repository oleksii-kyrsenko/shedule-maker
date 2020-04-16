import axios from 'axios';
import { put, all, takeEvery } from 'redux-saga/effects';

import {
	fetchAllGroups,
	createGroup,
	deleteGroup,
	editGroup,
	fetchGroupById,
	addGroupStudentsFromFile,
} from './routines';
import { loadData, errorData, successData, clearMessages } from '../../commons/routines';

function* fetchAllGroupsSaga() {
	try {
		yield all([put(loadData.request())]);
		const response = yield axios.get('/api/groups');
		yield put(fetchAllGroups.success(response.data));
	} catch (error) {
		const errors = error.response.data.errors;
		yield all([put(errorData.trigger(errors)), put(fetchAllGroups.failure())]);
	} finally {
		yield all([put(loadData.fulfill()), put(clearMessages())]);
	}
}

function* createGroupSaga({ payload }) {
	try {
		yield all([put(loadData.request()), put(createGroup.request())]);
		const response = yield axios.post('/api/groups', payload);
		yield all([
			put(createGroup.success(response.data.group)),
			put(successData(response.data.success)),
			put(fetchAllGroups()),
		]);
	} catch (error) {
		const errors = error.response.data.errors;
		yield all([put(errorData.trigger(errors))]);
	} finally {
		yield all([put(clearMessages())]);
	}
}

function* deleteGroupSaga({ payload }) {
	try {
		yield all([put(loadData.request())]);
		const response = yield axios.delete(`/api/groups/${payload}`);
		yield all([put(successData(response.data.success)), put(fetchAllGroups())]);
	} catch (error) {
		const errors = error.response.data.errors;
		yield all([put(errorData.trigger(errors))]);
	} finally {
		yield all([put(clearMessages())]);
	}
}

function* editGroupSaga({ payload }) {
	try {
		yield all([put(loadData.request()), put(editGroup.request())]);
		const { id, data } = payload;
		const response = yield axios.put(`/api/groups/${id}`, data);
		yield all([
			put(editGroup.success(response.data.group)),
			put(successData(response.data.success)),
			put(fetchAllGroups()),
		]);
	} catch (error) {
		const errors = error.response.data.errors;
		yield all([put(errorData.trigger(errors))]);
	} finally {
		yield all([put(clearMessages())]);
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

function* addGroupStudentsFromFileSaga({ payload }) {
	try {
		const { groupId, data } = payload;
		const response = yield axios.post(`/api/groups/${groupId}/file/students/`, data);
		console.log(response);
	} catch (error) {
		const errors = error.response.data.errors;
		console.log(errors);
	} finally {
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

function* addGroupStudentsFromFileWatcherSaga() {
	yield takeEvery(addGroupStudentsFromFile.TRIGGER, addGroupStudentsFromFileSaga);
}

export function* groupsSagas() {
	yield all([
		fetchAllGroupsWatcherSaga(),
		createGroupWatcherSaga(),
		deleteGroupWatcherSaga(),
		editGroupWatcherSaga(),
		fetchGroupByIdWatcherSaga(),
		addGroupStudentsFromFileWatcherSaga(),
	]);
}
