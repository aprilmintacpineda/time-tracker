import { combineReducers } from 'redux';

// reducers
import collections from './collections/reducer';
import tasks from './tasks/reducer';
import create_tasks from './create_tasks/reducer';
import notifications from './notifications/reducer';

export default combineReducers({
  collections,
  tasks,
  create_tasks,
  notifications
});