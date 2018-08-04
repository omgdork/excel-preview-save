import {
  DATA_GET,
  DATA_GET_SUCCESS,
  DATA_GET_ERROR,
  DATA_SAVE,
  DATA_SAVE_SUCCESS,
  DATA_SAVE_ERROR,
  DATA_SYNC,
  DATA_SYNC_SUCCESS,
  DATA_SYNC_ERROR,
} from './constants';

export const initialState = {
  data: {
    xlsData: [],
    errors: [{
      getData: '',
      saveData: '',
      syncData: '',
    }],
  },
  ui: {
    isGettingData: false,
    isSavingData: false,
    isSyncingData: false,
  },
};

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case DATA_GET:
      return {
        ...state,
        ui: {
          ...state.ui,
          isGettingData: true,
        },
      };
    case DATA_GET_SUCCESS: {
      return {
        ...state,
        data: {
          xlsData: [...action.payload.data],
          errors: {
            ...state.data.errors,
            getData: '',
          },
        },
        ui: {
          ...state.ui,
          isGettingData: false,
        }
      }
    }
    case DATA_GET_ERROR: {
      return {
        ...state,
        data: {
          ...state.data,
          errors: {
            ...state.data.errors,
            getData: action.payload.error,
          },
        },
        ui: {
          ...state.ui,
          isGettingData: false,
        },
      };
    }
    case DATA_SAVE:
      return {
        ...state,
        ui: {
          ...state.ui,
          isSavingData: true,
        },
      };
    case DATA_SAVE_SUCCESS:
      return {
        ...state,
        data: {
          xlsData: [...state.data.xlsData, action.payload.data],
          errors: {
            ...state.data.errors,
            saveData: '',
          },
        },
        ui: {
          ...state.ui,
          isSavingData: false,
        },
      };
    case DATA_SAVE_ERROR:
      return {
        ...state,
        data: {
          ...state.data,
          errors: {
            ...state.data.errors,
            saveData: action.payload.error,
          },
        },
        ui: {
          ...state.ui,
          isSavingData: false,
        },
      };
    case DATA_SYNC:
      return {
        ...state,
        ui: {
          ...state.ui,
          isSyncingData: true,
        },
      };
    case DATA_SYNC_SUCCESS:
      return {
        ...state,
        data: {
          xlsData: action.payload.data,
          errors: {
            ...state.data.errors,
            syncData: '',
          },
        },
        ui: {
          ...state.ui,
          isSyncingData: false,
        },
      };
    case DATA_SYNC_ERROR:
      return {
        ...state,
        data: {
          ...state.data,
          errors: {
            ...state.data.errors,
            syncData: action.payload.error,
          },
        },
        ui: {
          ...state.ui,
          isSyncingData: false,
        },
      };
    default:
      return state;
  }
}
