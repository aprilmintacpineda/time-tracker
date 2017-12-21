export const delay = (secs, callback = null) => new Promise((resolve) => {
  setTimeout(() => {
    if (callback != null) {
      callback();
    }
    resolve();
  }, secs * 1000);
});

export const random = (min = 1, max = 999999999) => min == max? min : Math.floor(Math.random() * (max > min? max : min)) + (max > min? min : max);

export const timeSpent = (first_started, last_stopped) =>
  !first_started || !last_stopped
  ? '00:00:00'
  : (last_stopped - first_started) / 1000;