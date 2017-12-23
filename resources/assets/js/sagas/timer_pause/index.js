import { take, fork } from 'redux-saga/effects';
import { types as actionTypes } from '../../redux/tasks/actions';
import worker from './worker';

export default function* () {
	while (true) {
		const action = yield take(actionTypes.pauseTimer);
		yield fork(worker, action);
	}
}