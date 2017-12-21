import { take, fork } from 'redux-saga/effects';
import { types as actionTypes } from '../../redux/collections/actions';
import worker from './worker';

export default function* () {
  while (true) {
    yield take(actionTypes.fetch);
    yield fork(worker);
  }
}