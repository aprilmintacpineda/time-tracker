import { put, select, call } from 'redux-saga/effects';
import axios from 'axios';
import { submitting, submitted } from '../../redux/create_tasks/actions';
import { prepend } from '../../redux/tasks/actions';
import { selectFetchStatus, selectFields } from './selectors';
import settings from '../../settings';

export default function* () {
	const fetchStatus = yield select(selectFetchStatus);
	if (fetchStatus.allow && !fetchStatus.sending) {
		yield put(submitting());
		try {
			const data = yield select(selectFields);
			const response = yield call(axios.post, '/tasks/create', {
				tasks: [...data]
			});
			yield put(submitted({
				status: 200,
				message: 'Successfully created ' + data.length + ' task(s).'
			}));
			yield put(prepend(response.data));
		} catch (e) {
			if (e.response && e.response.status == 422) {
				yield put(submitted({
					errors: e.response.data.errors
				}));
			} else {
				yield put(submitted({
					status: 500,
					message: settings.sendFailedMessage
				}));
			}
		}
	}
}