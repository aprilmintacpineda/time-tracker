import { combineReducers } from 'redux';

// reducers
import collections from './collections/reducer';
import tasks from './tasks/reducer';

export default combineReducers({
	collections,
	tasks
});