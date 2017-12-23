import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import { pauseTimer, pauseTimerFailed, pauseTimerSuccessful } from '../../redux/tasks/actions';
import { create } from '../../redux/notifications/actions';
import { delay, random } from '../../helpers';

export default function* (action) {
	if (action.task.failedToPause || action.task.is_playing == 1) {
		try {
			yield call(axios.post, 'timer/stop', {
				id: action.task.id,
				timestamp: action.timestamp,
				seconds_spent: action.secondsSpent
			});
			yield put(pauseTimerSuccessful(action.task_index));
			yield put(create('Timer for `' + action.task.title + '` was successfully paused in the backend.'));
		} catch (e) {
			yield put(pauseTimerFailed(action.task_index));
			yield put(create('Timer for `' + action.task.title + '` failed to pause in the backend. Will try again after 5 seconds. Please feel free to work.'));
			yield delay(5);
			yield put(pauseTimer(action.task, action.task_index, action.timestamp, action.secondsSpent));
		}
	}
}