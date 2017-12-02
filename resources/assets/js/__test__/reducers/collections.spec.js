import { types as actionTypes } from '../../redux/collections/actions';
import initial_state from '../../redux/collections/initial_state';
import reducer from '../../redux/collections/reducer';
import settings from '../../settings';

describe('Reducers: collections', () => {
	it('gives its default state', () => {
		expect(reducer(undefined, {
			type: 'init'
		})).toEqual(initial_state);
	});

	it('handles fetching', () => {
		expect(reducer(initial_state, {
			type: actionTypes.fetching
		})).toEqual({
			...initial_state,
			fetch: {
				...initial_state.fetch,
				prestine: false,
				sending: true,
				status: null,
				message: null,
				count: 1
			}
		});
	});

	it('handles fetched', () => {
		// successful fetch
		expect(reducer({
			...initial_state,
			fetch: {
				...initial_state.fetch,
				sending: true
			}
		}, {
			type: actionTypes.fetched,
			status: 200,
			data: [{ test: 1 }]
		})).toEqual({
			...initial_state,
			fetch: {
				...initial_state.fetch,
				prestine: false,
				sending: false,
				status: 200,
				count: 2
			},
			data: [{ test: 1 }]
		});
		// failed fetch
		expect(reducer({
			...initial_state,
			fetch: {
				...initial_state.fetch,
				sending: true
			}
		}, {
			type: actionTypes.fetched,
			status: 500,
			message: settings.retryMessage
		})).toEqual({
			...initial_state,
			fetch: {
				...initial_state.fetch,
				prestine: false,
				sending: false,
				status: 500,
				message: settings.retryMessage,
				count: 1
			}
		});
	});
});