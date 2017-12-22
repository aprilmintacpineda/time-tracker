import { take, fork } from 'redux-saga/effects';
import { types as actionTypes } from '../../redux/tasks/actions';
import worker from './worker';

export default function* () {
	while (true) {
		let action = yield take(actionTypes.runTimer);
		yield fork(worker, action);
	}
}