import { take, fork } from 'redux-saga/effects';
import { types as actionTypes } from '../../redux/create_tasks/actions';
import worker from './worker';

export default function* () {
	while (true) {
		yield take(actionTypes.submit);
		yield fork(worker);
	}
}