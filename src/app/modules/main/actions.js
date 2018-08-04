import {
  DATA_GET,
  DATA_GETTING,
  DATA_GET_SUCCESS,
  DATA_GET_ERROR,
  DATA_SAVE,
  DATA_SAVING,
  DATA_SAVE_SUCCESS,
  DATA_SAVE_ERROR,
  DATA_SYNC,
  DATA_SYNCING,
  DATA_SYNC_SUCCESS,
  DATA_SYNC_ERROR,
  DATA_SET_ERROR_MESSAGE,
} from './constants';

export function getData() {
  return {
    type: DATA_GET,
  };
}

export function setDataGetting(isGetting) {
  return {
    type: DATA_GETTING,
    payload: {
      isGetting,
    },
  };
}

export function getDataSuccess(data) {
  return {
    type: DATA_GET_SUCCESS,
    payload: {
      data,
    },
  };
}

export function getDataError(error) {
  return {
    type: DATA_GET_ERROR,
    payload: {
      error,
    },
  };
}

export function saveData(data) {
  return {
    type: DATA_SAVE,
    payload: {
      data,
    },
  };
}

export function setDataSaving(isSaving) {
  return {
    type: DATA_SAVING,
    payload: {
      isSaving,
    }
  }
}

export function saveDataSuccess(data) {
  return {
    type: DATA_SAVE_SUCCESS,
    payload: {
      data,
    },
  };
}

export function saveDataError(error) {
  return {
    type: DATA_SAVE_ERROR,
    payload: {
      error,
    },
  };
}

export function syncData(data) {
  console.log(data);

  return {
    type: DATA_SYNC,
    payload: {
      data,
    },
  };
}

export function setDataSyncing(isSyncing) {
  return {
    type: DATA_SYNCING,
    payload: {
      isSyncing,
    },
  };
}

export function syncDataSuccess(data) {
  return {
    type: DATA_SYNC_SUCCESS,
    payload: {
      data,
    },
  };
}

export function syncDataError(error) {
  return {
    type: DATA_SYNC_ERROR,
    payload: {
      error,
    },
  };
}

export function setErrorMessage(errorType, errorMessage) {
  return {
    type: DATA_SET_ERROR_MESSAGE,
    payload: {
      errorType,
      errorMessage,
    },
  };
}
