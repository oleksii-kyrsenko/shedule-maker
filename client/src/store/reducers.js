import { combineReducers } from 'redux';

import { authReducer } from '../pages/Auth/reducers';
import { groupsReducer } from '../pages/Groups/reducers';
import { commonsReducer } from '../commons/reducers';

export const reducer = combineReducers({ authReducer, commonsReducer, groupsReducer });
