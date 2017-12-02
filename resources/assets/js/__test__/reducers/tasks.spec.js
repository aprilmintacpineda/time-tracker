import { types as actionTypes } from '../../redux/tasks/actions';
import initial_state from '../../redux/tasks/initial_state';
import reducer from '../../redux/tasks/reducer';
import settings from '../../settings';

describe('Reducers: tasks', () => {
	it('gives its default state', () => {
		expect(reducer(undefined, {
			type: 'init'
		})).toEqual(initial_state);
	});

	it('handles fetching', () => {
		expect(reducer({
			...initial_state,
		}, {
			type: actionTypes.fetching
		})).toEqual({
			...initial_state,
			fetch: {
				...initial_state.fetch,
				prestine: false,
				sending: true,
				status: null,
				message: null
			}
		});
	});

	it('handles fetched', () => {
		// successful fetched
		expect(reducer({
			...initial_state,
			fetch: {
				...initial_state.fetch,
				sending: true,
				count: 1
			}
		}, {
			type: actionTypes.fetched,
			status: 200,
			data: [{ test: 1 }]
		})).toEqual({
			...initial_state,
			fetch: {
				prestine: false,
				sending: false,
				status: 200,
				message: null,
				count: 2
			},
			data: [{ test: 1 }]
		});
	});
});