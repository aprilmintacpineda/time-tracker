import initial_state from '../../redux/notifications/initial_state';
import reducer from '../../redux/notifications/reducer';
import { push, clear } from '../../redux/notifications/actions';

describe('Reducer: notifications', () => {
	it('gives its initial_state', () => {
		expect(reducer(undefined, {
			type: 'init'
		})).toEqual(initial_state);
	});

	it('handles actions.push', () => {
		expect(reducer(initial_state, push('Example notification'))).toEqual(['Example notification']);
	});

	it('handles actions.clear', () => {
		expect(reducer(['Example notification'], clear('Example notification'))).toEqual([]);
	});
});