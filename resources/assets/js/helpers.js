export const delay = (secs, callback = null) => new Promise((resolve) => {
  setTimeout(() => {
    if (callback != null) {
      callback();
    }
    resolve();
  }, secs * 1000);
});