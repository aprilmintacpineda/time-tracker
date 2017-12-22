import initial_state from './initial_state';
import { types as actionTypes } from './actions';

export default (state = initial_state, action) => {
	switch (action.type) {
		case actionTypes.push:
			return state.concat(action.message);

		case actionTypes.clear:
			return state.filter(i => i != action.notification_index);

		default:
			return [ ...state ];
	}
};