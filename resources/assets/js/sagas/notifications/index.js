import { take, fork } from 'redux-saga/effects';
import { types as actionTypes } from '../../redux/notifications/actions';
import worker from './worker';

export default function* () {
	while (true) {
		const action = yield take(actionTypes.create);
		yield fork(worker, action);
	}
}