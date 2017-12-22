import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import worker from '../../../sagas/run_timer/worker';
import { runTimerSuccessful, runTimerFailed, runTimer } from '../../../redux/tasks/actions';
import { push } from '../../../redux/notifications/actions';
import { delay } from '../../../helpers';

describe('Saga: run_timer/worker', () => {
	it('does not do anything if the task is already playing', () => {
		let workerSaga = worker({
			task: {
				id: 1,
				failedToRun: false,
				is_playing: true
			},
			task_index: 0,
			timestamp: new Date().getTime()
		});

		expect(workerSaga.next().value).toEqual(undefined);
	});

	it('runs when failedToRun is true', () => {
		let action = {
			task: {
				id: 1,
				failedToRun: true,
				is_playing: true
			},
			task_index: 0,
			timestamp: new Date().getTime()
		};
		let workerSaga = worker(action);

		expect(workerSaga.next().value).toEqual(call(axios.post, {
			id: action.task.id,
			timestamp: action.timestamp
		}));
	});

	it('runs when the task is not already playing and calls runTimerSuccessful upon success', () => {
		let action = {
			task: {
				id: 1,
				failedToRun: false,
				is_playing: false
			},
			task_index: 0,
			timestamp: new Date().getTime()
		};
		let workerSaga = worker(action);

		expect(workerSaga.next().value).toEqual(call(axios.post, {
			id: action.task.id,
			timestamp: action.timestamp
		}));
		expect(workerSaga.next().value).toEqual(put(runTimerSuccessful(action.task_index)));
		expect(workerSaga.next().value).toEqual(put(push('Timer for `' + action.task.title + '` was successfully run in the backend.')));
		expect(workerSaga.next().value).toEqual(undefined);
	});

	it('runs when the task is not already playing and calls runTimerFailed upon failure', () => {
		let action = {
			task: {
				id: 1,
				failedToRun: false,
				is_playing: false
			},
			task_index: 0,
			timestamp: new Date().getTime()
		};
		let workerSaga = worker(action);

		expect(workerSaga.next().value).toEqual(call(axios.post, {
			id: action.task.id,
			timestamp: action.timestamp
		}));
		expect(workerSaga.throw().value).toEqual(put(runTimerFailed(action.task_index)));
		expect(workerSaga.next().value).toEqual(put(push('Timer for `' + action.task.title + '` failed to run in the backend. Will try again after 5 seconds. Please feel free to work.')));
		expect(workerSaga.next().value).toEqual(delay(5000));
		expect(workerSaga.next().value).toEqual(put(runTimer(action.task, action.task_index, action.timestamp)));
		expect(workerSaga.next().value).toEqual(undefined);
	});
});