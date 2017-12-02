import { take, fork } from 'redux-saga/effects';
import { types as actionTypes } from '../../../redux/collections/actions';
import watcher from '../../../sagas/collections';
import worker from '../../../sagas/collections/worker';

const watcherSaga = watcher();

describe('Saga: collections/watcher', () => {
	it('continuously watches for actionTypes.fetch action', () => {
		expect(watcherSaga.next().value).toEqual(take(actionTypes.fetch));
		expect(watcherSaga.next().value).toEqual(fork(worker));

		expect(watcherSaga.next().value).toEqual(take(actionTypes.fetch));
		expect(watcherSaga.next().value).toEqual(fork(worker));

		expect(watcherSaga.next().value).toEqual(take(actionTypes.fetch));
		expect(watcherSaga.next().value).toEqual(fork(worker));
	});
});