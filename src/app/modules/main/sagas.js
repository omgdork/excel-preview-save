import uuid from 'uuid-v4';
import { put, takeEvery } from 'redux-saga/effects';
import {
  setDataGetting,
  getDataSuccess,
  getDataError,
  setDataSaving,
  saveDataSuccess,
  saveDataError,
  setDataSyncing,
  syncDataSuccess,
  syncDataError,
} from './actions';
import {
  DATA_GET,
  DATA_GET_ERROR,
  DATA_SAVE,
  DATA_SAVE_ERROR,
  DATA_SYNC,
  DATA_SYNC_ERROR,
  DATA_SET_ERROR_MESSAGE,
} from './constants';
import {
  getData as getDataFromStorage,
  saveData as saveDataToStorage,
} from '../../utilities/data';

/**
 * Gets the data.
 */
export function* getData() {
  try {
    yield put(setDataGetting(true));
    yield put(getDataSuccess(getDataFromStorage()));
  } catch (e) {
    yield put(getDataError(e));
  } finally {
    yield put(setDataGetting(false));
  }
}

/**
 * Saga for getting data.
 */
export function* getDataSaga() {
  yield takeEvery(DATA_GET, getData);
}

/**
 * Saves the data.
 * @param {object} data - The xls data object.
 */
export function* saveData({ payload: { data }}) {
  try {
    yield put(setDataSaving(true));
    
    const xls = {
      id: uuid(),
      date: JSON.stringify(new Date()),
      data: data.entries,
      filename: data.filename,
    };
    
    saveDataToStorage(xls);

    yield put(saveDataSuccess(xls));
  } catch (e) {
    yield put(saveDataError(e));
  } finally {
    yield put(setDataSaving(false));
  }
}

/**
 * Saga for saving data.
 */
export function* saveDataSaga() {
  yield takeEvery(DATA_SAVE, saveData);
}

/**
 * Syncs the data from storage to server.
 * @param {object} data - The data from the storage to sync.
 */
export function* syncData({ payload: { data }}) {
  try {
    yield put(setDataSyncing(true));

    console.log('Syncing', data);

    // TODO: Call API to sync data.
    const newData = [...data];
    yield put(syncDataSuccess(newData));
  } catch (e) {
    yield put(syncDataError(e));
  } finally {
    yield put(setDataSyncing(false));
  }
}

/**
 * Saga for syncing data.
 */
export function* syncDataSaga() {
  yield takeEvery(DATA_SYNC, syncData);
}

/**
 * Sets the error message.
 * @param {string} errorType - The error type.
 * @param {string} errorMessage - The error message.
 */
export function* setErrorMessage({ payload: { errorType, errorMessage } }) {
  switch (errorType) {
    case DATA_GET_ERROR:
      yield put(getDataError(errorMessage));
      break;
    case DATA_SAVE_ERROR:
      yield put(saveDataError(errorMessage));
      break;
    case DATA_SYNC_ERROR:
      yield put(syncDataError(errorMessage));
      break;
    default:
  }
}

/**
 * Saga for setting the error message.
 */
export function* setErrorMessageSaga() {
  yield takeEvery(DATA_SET_ERROR_MESSAGE, setErrorMessage);
}

export default [
  getDataSaga,
  saveDataSaga,
  syncDataSaga,
  setErrorMessageSaga,
];
