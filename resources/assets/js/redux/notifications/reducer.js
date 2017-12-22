import initial_state from './initial_state';
import { types as actionTypes } from './actions';

export default (state = initial_state, action) => {
	switch (action.type) {
		case actionTypes.push:
			return state.concat(action.notification);

		case actionTypes.remove:
			return state
				.filter(notification => notification.id != action.target_id);

		default:
			return [...state];
	}
};