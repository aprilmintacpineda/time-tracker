import initial_state from './initial_state';
import { types as actionTypes } from './actions';
import * as actions from './actions';

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
          sending: false,
          prestine: false,
          status: action.status,
          message: action.status == 200? null : action.message,
          count: action.status == 200 && action.data.length > 0? ++state.fetch.count : state.fetch.count
        },
        data: action.status == 200? [
          ...state.data,
          ...action.data
        ] : state.data
      };

    default:
      return { ...state };
  }
};