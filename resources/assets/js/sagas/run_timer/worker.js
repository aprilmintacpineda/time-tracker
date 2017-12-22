import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
	types as actionTypes,
	runTimer,
	runTimerFailed,
	runTimerSuccessful
} from '../../redux/tasks/actions';
import { delay } from '../../helpers';

export default function* (action) {
	if (action.task.failedToRun || !action.task.is_playing || action.task.is_playing == 0) {
		try {
			yield call(axios.post, {
				id: action.task.id,
				timestamp: action.timestamp
			});
			yield put(runTimerSuccessful(action.task_index));
		} catch (e) {
			// TODO: push notifications
			yield put(runTimerFailed(action.task_index));
			yield delay(5000);
			yield put(runTimer(action.task, action.task_index, action.timestamp));
		}
	}
}