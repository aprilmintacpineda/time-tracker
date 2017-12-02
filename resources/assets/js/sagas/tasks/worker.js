import { select, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { fetch, fetching, fetched } from '../../redux/tasks/actions';
import { selectFetchStatus } from './selectors';
import { delay } from '../../helpers';
import settings from '../../settings';

export default function* () {
	const fetchStatus = yield select(selectFetchStatus);

	if (!fetchStatus.sending) {
		try {
			yield put(fetching());
			const response = yield call(axios.get, '/tasks/paginate/' + fetchStatus.count);
			yield put(fetched({
				status: 200,
				data: response.data
			}));
		} catch (e) {
			if (e.response) {
				yield put(fetched({
					status: e.response.status,
					message: settings.retryMessage
				}));
			} else {
				yield put(fetched({
					status: 500,
					message: e.message
				}));
			}
			
			yield call(delay, settings.retryIn);
			yield put(fetch());
		}
	}
};