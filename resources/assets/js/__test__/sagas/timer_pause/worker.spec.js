import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import worker from '../../../sagas/timer_pause/worker';
import { pauseTimerSuccessful, pauseTimerFailed, pauseTimer } from '../../../redux/tasks/actions';
import { create } from '../../../redux/notifications/actions';
import { delay } from '../../../helpers';

describe('Saga: timer_pause/worker', () => {
  it('does not do anything if the task is not playing', () => {
    let workerSaga = worker({
      task: {
        id: 1,
        failedToPause: false,
        is_playing: false
      },
      task_index: 0,
      timestamp: new Date().getTime()
    });

    expect(workerSaga.next().value).toEqual(undefined);
  });

  it('runs when failedToPause is true', () => {
    let action = {
      task: {
        id: 1,
        failedToPause: true,
        is_playing: false
      },
      task_index: 0,
      timestamp: new Date().getTime(),
      secondsSpent: 435
    };
    let workerSaga = worker(action);

    expect(workerSaga.next().value).toEqual(call(axios.post, 'timer/stop', {
      id: action.task.id,
      timestamp: action.timestamp,
      seconds_spent: action.secondsSpent
    }));
  });

  it('runs when the task is playing and calls pauseTimerSuccessful upon success', () => {
    let action = {
      task: {
        id: 1,
        failedToPause: false,
        is_playing: true
      },
      task_index: 0,
      timestamp: new Date().getTime(),
      secondsSpent: 123
    };
    let workerSaga = worker(action);

    expect(workerSaga.next().value).toEqual(call(axios.post, 'timer/stop', {
      id: action.task.id,
      timestamp: action.timestamp,
      seconds_spent: action.secondsSpent
    }));
    expect(workerSaga.next().value).toEqual(put(pauseTimerSuccessful(action.task_index)));
    expect(workerSaga.next().value).toEqual(put(create('Timer for `' + action.task.title + '` was successfully paused in the backend.')));
    expect(workerSaga.next().value).toEqual(undefined);
  });

  it('runs when the task is playing and calls pauseTimerFailed upon failure', () => {
    let action = {
      task: {
        id: 1,
        failedToPause: false,
        is_playing: true
      },
      task_index: 0,
      timestamp: new Date().getTime(),
      secondsSpent: 123
    };
    let workerSaga = worker(action);

    expect(workerSaga.next().value).toEqual(call(axios.post, 'timer/stop', {
      id: action.task.id,
      timestamp: action.timestamp,
      seconds_spent: action.secondsSpent
    }));
    expect(workerSaga.throw().value).toEqual(put(pauseTimerFailed(action.task_index)));
    expect(workerSaga.next().value).toEqual(put(create('Timer for `' + action.task.title + '` failed to pause in the backend. Will try again after 5 seconds. Please feel free to work.')));
    expect(workerSaga.next().value).toEqual(delay(5000));
    expect(workerSaga.next().value).toEqual(put(pauseTimer(action.task, action.task_index, action.timestamp, action.secondsSpent)));
    expect(workerSaga.next().value).toEqual(undefined);
  });
});