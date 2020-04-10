import { all } from 'redux-saga/effects';

import { authSagas } from '../pages/Auth/sagas';
import { groupsSagas } from '../pages/Groups/sagas';

export function* rootSaga() {
	yield all([authSagas(), groupsSagas()]);
}
