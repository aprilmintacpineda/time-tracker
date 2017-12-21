import { take, fork } from 'redux-saga/effects';
import { types as actionTypes } from '../../../redux/tasks/actions';
import watcher from '../../../sagas/tasks';
import worker from '../../../sagas/tasks/worker';

const watcherSaga = watcher();

describe('Saga: tasks/watcher', () => {
  it('continuously watches for actionTypes.fetch action', () => {
    expect(watcherSaga.next().value).toEqual(take(actionTypes.fetch));
    expect(watcherSaga.next().value).toEqual(fork(worker));

    expect(watcherSaga.next().value).toEqual(take(actionTypes.fetch));
    expect(watcherSaga.next().value).toEqual(fork(worker));

    expect(watcherSaga.next().value).toEqual(take(actionTypes.fetch));
    expect(watcherSaga.next().value).toEqual(fork(worker));
  });
});