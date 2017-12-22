import { take, fork } from 'redux-saga/effects';
import { types as actionTypes } from '../../../redux/notifications/actions';
import watcher from '../../../sagas/notifications';
import worker from '../../../sagas/notifications/worker';

const watcherSaga = watcher();

describe('Saga: notifications/watcher', () => {
  it('continuously watches for actionTypes.create action', () => {
    let action = {
      type: actionTypes.create,
      task: {}
    };

    expect(watcherSaga.next().value).toEqual(take(actionTypes.create));
    expect(watcherSaga.next(action).value).toEqual(fork(worker, action));

    expect(watcherSaga.next().value).toEqual(take(actionTypes.create));
    expect(watcherSaga.next(action).value).toEqual(fork(worker, action));

    expect(watcherSaga.next().value).toEqual(take(actionTypes.create));
    expect(watcherSaga.next(action).value).toEqual(fork(worker, action));
  });
});