import { all } from 'redux-saga/effects';

import collections from './collections';
import tasks from './tasks';
import create_tasks from './create_tasks';
import timer_run from './timer_run';
import timer_pause from './timer_pause';
import notifications from './notifications';

export default function* () {
  yield all([
    collections(),
    tasks(),
    create_tasks(),
    timer_run(),
    timer_pause(),
    notifications()
  ]);
}