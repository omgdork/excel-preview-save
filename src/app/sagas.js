import { fork, all } from 'redux-saga/effects';
import mainSagas from './modules/main/sagas';

export default function* rootSaga() {
  yield all([...mainSagas.map((saga) => fork(saga))]);
}
