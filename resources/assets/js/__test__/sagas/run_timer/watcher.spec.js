import { take, fork } from 'redux-saga/effects';
import { types as actionTypes } from '../../../redux/tasks/actions';
import watcher from '../../../sagas/run_timer';
import worker from '../../../sagas/run_timer/worker';

const watcherSaga = watcher();

describe('Saga: run_timer/watcher', () => {
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