import { take, fork } from 'redux-saga/effects';
import { types as actionTypes } from '../../../redux/tasks/actions';
import watcher from '../../../sagas/timer_run';
import worker from '../../../sagas/timer_run/worker';

const watcherSaga = watcher();

describe('Saga: timer_run/watcher', () => {
  it('continuously watches for actionTypes.runTimer action', () => {
    let action = {
      type: actionTypes.runTimer,
      task: {}
    };

    expect(watcherSaga.next().value).toEqual(take(actionTypes.runTimer));
    expect(watcherSaga.next(action).value).toEqual(fork(worker, action));

    expect(watcherSaga.next().value).toEqual(take(actionTypes.runTimer));
    expect(watcherSaga.next(action).value).toEqual(fork(worker, action));

    expect(watcherSaga.next().value).toEqual(take(actionTypes.runTimer));
    expect(watcherSaga.next(action).value).toEqual(fork(worker, action));
  });
});