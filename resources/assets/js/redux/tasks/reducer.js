import initial_state from './initial_state';
import { types as actionTypes } from './actions';

export default (state = initial_state, action) => {
  switch (action.type) {
    case actionTypes.fetching:
      return {
        ...state,
        fetch: {
          ...state.fetch,
          prestine: false,
          sending: true,
          status: null,
          message: null
        }
      };

    case actionTypes.fetched:
      return {
        ...state,
        fetch: {
          prestine: false,
          sending: false,
          status: action.status,
          message: action.status == 200? null : action.message,
          count: action.status == 200? ++state.fetch.count : state.fetch.count
        },
        data: action.status == 200? [
          ...state.data,
          ...action.data
        ] : state.data
      };

    case actionTypes.prepend:
      return {
        ...state,
        data: [...state.data, ...action.data]
          .sort((a, b) => a.created_at < b.created_at && a.title < b.title)
      };

    case actionTypes.runTimer:
      return {
        ...state,
        data: state.data.map((data, i) => i == action.task_index
        ? {
            ...data,
            first_started: !data.first_started? action.timestamp : data.first_started,
            is_playing: true
          }
        : { ...data })
      };

    case actionTypes.runTimerFailed:
      return {
        ...state,
        data: state.data.map((data, i) => i == action.task_index
        ? {
            ...data,
            failedToRun: true
          }
        : { ...data })
      };

    case actionTypes.runTimerSuccessful:
      return {
        ...state,
        data: state.data.map((data, i) => i == action.task_index
        ? {
            ...data,
            failedToRun: false
          }
        : { ...data })
      };

    case actionTypes.pauseTimer:
      return {
        ...state,
        data: state.data.map((data, i) => i == action.task_index
        ? {
            ...data,
            last_stopped: action.timestamp,
            secondsSpent: action.secondsSpent,
            is_playing: false
         }
        : { ...data })
      };

    case actionTypes.pauseTimerFailed:
      return {
        ...state,
        data: state.data.map((data, i) => i == action.task_index
        ? {
            ...data,
            failedToPause: true
          }
        : { ...data })
      };

    case actionTypes.pauseTimerSuccessful:
      return {
        ...state,
        data: state.data.map((data, i) => i == action.task_index
        ? {
            ...data,
            failedToPause: false
          }
        : { ...data })
      };

    default:
      return { ...state };
  }
};