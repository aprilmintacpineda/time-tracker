import { put, call } from 'redux-saga/effects';
import { push, remove } from '../../redux/notifications/actions';
import { delay, random } from '../../helpers';

export default function* (action) {
	const id = yield call(random);
	yield put(push({
		id,
		message: action.message
	}));
	yield delay(5);
	yield put(remove(id));
}