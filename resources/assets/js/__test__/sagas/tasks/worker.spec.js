import { call, put, select } from 'redux-saga/effects';
import { fetch, fetching, fetched } from '../../../redux/tasks/actions';
import axios from 'axios';
import worker from '../../../sagas/tasks/worker';
import { selectFetchStatus } from '../../../sagas/tasks/selectors';
import { delay } from '../../../helpers';
import settings from '../../../settings';

let workerSaga = worker();

describe('Saga: tasks/worker', () => {
	it('selects selectFetchStatus', () => {
		expect(workerSaga.next().value).toEqual(select(selectFetchStatus));
	});

	it('does not do anything if we are sending', () => {
		expect(workerSaga.next({
			sending: true
		}).value).toEqual(undefined);
	});

	it('puts fetching', () => {
		workerSaga = worker();
		workerSaga.next();
		expect(workerSaga.next({
			sending: false,
			count: 1
		}).value).toEqual(put(fetching()));
	});

	it('sends a get-call to /tasks/paginate/{count}', () => {
		expect(workerSaga.next().value).toEqual(call(axios.get, '/tasks/paginate/1'));
	});

	it('puts fetched on success', () => {
		expect(workerSaga.next({
			data: [{ test: 1 }]
		}).value).toEqual(put(fetched({
			status: 200,
			data: [{ test: 1 }]
		})));
	});

	it('handles exception', () => {
		expect(workerSaga.throw({
			response: {
				status: 500
			}
		}).value).toEqual(put(fetched({
			status: 500,
			message: settings.retryMessage
		})));
		expect(workerSaga.next().value).toEqual(call(delay, settings.retryIn));
		expect(workerSaga.next().value).toEqual(put(fetch()));
	});
});