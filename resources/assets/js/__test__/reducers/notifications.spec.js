import initial_state from '../../redux/notifications/initial_state';
import reducer from '../../redux/notifications/reducer';
import { push, remove } from '../../redux/notifications/actions';

describe('Reducer: notifications', () => {
  it('gives its initial_state', () => {
    expect(reducer(undefined, {
      type: 'init'
    })).toEqual(initial_state);
  });

  it('handles actions.push', () => {
    expect(reducer(initial_state, push({
        id: 1,
        message: 'Example Message.'
      }))).toEqual([{
        id: 1,
        message: 'Example Message.'
      }]);
  });

  it('handles actions.remove', () => {
    expect(reducer([{
      id: 123,
      message: 'Example notification'
    }], remove(123))).toEqual([]);
  });
});