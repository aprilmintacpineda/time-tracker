import { take, fork } from 'redux-saga/effects';
import { types as actionTypes } from '../../../redux/tasks/actions';
import watcher from '../../../sagas/timer_pause';
import worker from '../../../sagas/timer_pause/worker';

const watcherSaga = watcher();

describe('Saga: timer_pause/watcher', () => {
  it('continuously watches for actionTypes.pauseTimer action', () => {
    let action = {
      type: actionTypes.pauseTimer,
      task: {}
    };

    expect(watcherSaga.next().value).toEqual(take(actionTypes.pauseTimer));
    expect(watcherSaga.next(action).value).toEqual(fork(worker, action));

    expect(watcherSaga.next().value).toEqual(take(actionTypes.pauseTimer));
    expect(watcherSaga.next(action).value).toEqual(fork(worker, action));

    expect(watcherSaga.next().value).toEqual(take(actionTypes.pauseTimer));
    expect(watcherSaga.next(action).value).toEqual(fork(worker, action));
  });
});