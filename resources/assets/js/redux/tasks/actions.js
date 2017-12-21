export const types = {
  fetch: 'TASKS_FETCH',
  fetching: 'TASKS_FETCHING',
  fetched: 'TASKS_FETCHED',
  prepend: 'TASKS_PREPEND',
  runTimer: 'TASKS_RUN_TIMER',
  pauseTimer: 'TASKS_PAUSE_TIMER'
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

export const runTimer = (task, i, timestamp) => ({
  type: types.runTimer,
  task_index: i,
  task,
  timestamp
});

export const pauseTimer = (task, i, timestamp) => ({
  type: types.pauseTimer,
  task_index: i,
  task,
  timestamp
});