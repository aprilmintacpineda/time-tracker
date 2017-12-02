import { all } from 'redux-saga/effects';

import collections from './collections';
import tasks from './tasks';

export default function* () {
	yield all([
		collections(),
		tasks()
	]);
}