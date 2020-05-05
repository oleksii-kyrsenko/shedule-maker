import axios from 'axios';
import { put, all, takeEvery } from 'redux-saga/effects';

import {
	fetchAllGroups,
	createGroup,
	deleteGroup,
	editGroup,
	fetchGroupById,
	addGroupStudentsFromFile,
	addGroupInstructorsFromFile,
	addGroupCarsFromFile,
} from './routines';
import {
	loadData,
	errorData,
	successData,
	clearMessages,
	setModalStatus,
} from '../../commons/routines';

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
			put(setModalStatus(false)),
			put(createGroup.success(response.data.group)),
			put(fetchAllGroups()),
			put(successData(response.data.success)),
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
			put(setModalStatus(false)),
			put(editGroup.success(response.data.group)),
			put(fetchAllGroups()),
			put(successData(response.data.success)),
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
		const response = yield axios.get(`/api/groups/${payload}`);
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
		yield all([
			put(clearMessages()),
			put(loadData.request()),
			put(addGroupStudentsFromFile.request()),
		]);
		const { groupId, data } = payload;
		const response = yield axios.post(`/api/groups/${groupId}/file/students/`, data);
		yield all([
			put(setModalStatus(false)),
			put(addGroupStudentsFromFile.success(response.data.group)),
			put(successData(response.data.success)),
		]);
	} catch (error) {
		const errors = error.response.data.errors;
		yield all([put(errorData.trigger(errors))]);
	} finally {
		yield put(loadData.fulfill());
	}
}

function* addGroupInstructorsFromFileSaga({ payload }) {
	try {
		yield all([put(loadData.request()), put(addGroupInstructorsFromFile.request())]);
		const { groupId, data } = payload;
		const response = yield axios.post(`/api/groups/${groupId}/file/instructors/`, data);
		yield all([
			put(setModalStatus(false)),
			put(addGroupInstructorsFromFile.success(response.data.group)),
			put(successData(response.data.success)),
		]);
	} catch (error) {
		const errors = error.response.data.errors;
		yield all([put(errorData.trigger(errors))]);
	} finally {
		yield put(loadData.fulfill());
	}
}

function* addGroupCarsFromFileSaga({ payload }) {
	try {
		yield all([put(loadData.request()), put(addGroupCarsFromFile.request())]);
		const { groupId, data } = payload;
		const response = yield axios.post(`/api/groups/${groupId}/file/cars/`, data);
		yield all([
			put(setModalStatus(false)),
			put(addGroupCarsFromFile.success(response.data.group)),
			put(successData(response.data.success)),
		]);
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

function* addGroupStudentsFromFileWatcherSaga() {
	yield takeEvery(addGroupStudentsFromFile.TRIGGER, addGroupStudentsFromFileSaga);
}

function* addGroupInstructorsFromFileWatcherSaga() {
	yield takeEvery(addGroupInstructorsFromFile.TRIGGER, addGroupInstructorsFromFileSaga);
}

function* addGroupCarsFromFileWatcherSaga() {
	yield takeEvery(addGroupCarsFromFile.TRIGGER, addGroupCarsFromFileSaga);
}

export function* groupsSagas() {
	yield all([
		fetchAllGroupsWatcherSaga(),
		createGroupWatcherSaga(),
		deleteGroupWatcherSaga(),
		editGroupWatcherSaga(),
		fetchGroupByIdWatcherSaga(),
		addGroupStudentsFromFileWatcherSaga(),
		addGroupInstructorsFromFileWatcherSaga(),
		addGroupCarsFromFileWatcherSaga(),
	]);
}
