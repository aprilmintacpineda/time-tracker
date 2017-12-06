import { all } from 'redux-saga/effects';

import collections from './collections';
import tasks from './tasks';
import create_tasks from './create_tasks';

export default function* () {
	yield all([
		collections(),
		tasks(),
		create_tasks()
	]);
}