import { all } from 'redux-saga/effects';

import collections from './collections';
import tasks from './tasks';
import create_tasks from './create_tasks';
import run_timer from './run_timer';
import notifications from './notifications';

export default function* () {
  yield all([
    collections(),
    tasks(),
    create_tasks(),
    run_timer(),
    notifications()
  ]);
}