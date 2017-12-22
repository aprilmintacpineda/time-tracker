export const types = {
  fetch: 'TASKS_FETCH',
  fetching: 'TASKS_FETCHING',
  fetched: 'TASKS_FETCHED',
  prepend: 'TASKS_PREPEND',
  runTimer: 'TASKS_RUN_TIMER',
  pauseTimer: 'TASKS_PAUSE_TIMER',
  runTimerFailed: 'TASKS_TIMER_RUN_FAILED',
  runTimerSuccessful: 'TASKS_TIMER_RUN_SUCCESSFUL'
};

export const fetch = () => ({
  type: types.fetch
});

export const fetching = () => ({
  type: types.fetching
});

export const fetched = payload => ({
  type: types.fetched,
  ...payload
});

export const prepend = data => ({
  type: types.prepend,
  data
});

export const runTimer = (task, task_index, timestamp) => ({
  type: types.runTimer,
  task_index,
  task,
  timestamp
});

export const pauseTimer = (task, task_index, timestamp, secondsSpent) => ({
  type: types.pauseTimer,
  task_index,
  task,
  timestamp,
  secondsSpent
});

export const runTimerFailed = task_index => ({
  type: types.runTimerFailed,
  task_index
});

export const runTimerSuccessful = task_index => ({
  type: types.runTimerSuccessful,
  task_index
});