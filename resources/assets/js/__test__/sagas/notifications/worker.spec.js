import { put, call } from 'redux-saga/effects';
import worker from '../../../sagas/notifications/worker';
import { push, remove } from '../../../redux/notifications/actions';
import { delay, random } from '../../../helpers';

const message = 'Example message.';
let workerSaga = worker({
  message
});

describe('Saga: notifications/worker', () => {
  it('generates an id', () => {
    expect(workerSaga.next().value).toEqual(call(random));
  });

  it('puts push', () => {
    expect(workerSaga.next(123).value).toEqual(put(push({
      id: 123,
      message
    })));
  });

  it('calls delay for 5 seconds', () => {
    expect(workerSaga.next().value).toEqual(delay(5));
  });

  it('puts remove', () => {
    expect(workerSaga.next().value).toEqual(put(remove(123)));
  });
});