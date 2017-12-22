import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
	types as actionTypes,
	runTimer,
	runTimerFailed,
	runTimerSuccessful
} from '../../redux/tasks/actions';
import { push } from '../../redux/notifications/actions';
import { delay } from '../../helpers';

export default function* (action) {
	if (action.task.failedToRun || !action.task.is_playing || action.task.is_playing == 0) {
		try {
			yield call(axios.post, 'timer/run', {
				id: action.task.id,
				timestamp: action.timestamp
			});
			yield put(runTimerSuccessful(action.task_index));
			yield put(push('Timer for `' + action.task.title + '` was successfully run in the backend.'));
		} catch (e) {
			yield put(runTimerFailed(action.task_index));
			yield put(push('Timer for `' + action.task.title + '` failed to run in the backend. Will try again after 5 seconds. Please feel free to work.'));
			yield delay(5);
			yield put(runTimer(action.task, action.task_index, action.timestamp));
		}
	}
}