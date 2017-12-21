export const timeSpent(first_started, last_stopped) =>
  !first_started || !last_stopped
  ? '00:00:00'
  : (new Date(last_stopped).getTime() - new Date(first_started).getTime()) / 1000;