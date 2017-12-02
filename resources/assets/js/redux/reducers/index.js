import { combineReducers } from 'redux';

export default combineReducers({
	test: (state, action) => {
		console.log(action);

		return { ...state };
	}
});