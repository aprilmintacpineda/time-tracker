import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

// root reducer
import rootReducer from './index';
// root saga
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = (compose(
  applyMiddleware(sagaMiddleware)
)(createStore)(rootReducer));

sagaMiddleware.run(rootSaga);

export default store;