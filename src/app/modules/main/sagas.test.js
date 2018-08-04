import { put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import {
  setDataGetting,
  getDataSuccess,
  getDataError,
  setDataSaving,
  saveDataError,
  setDataSyncing,
  syncDataSuccess,
  syncDataError,
} from './actions';
import {
  getData,
  saveData,
  syncData,
} from './sagas';

describe('Sagas', () => {
  describe('Getting Data', () => {
    const generator = cloneableGenerator(getData)();
    const errorGenerator = generator.clone();

    it('should set DATA_GETTING to true.', () => {
      const expected = put(setDataGetting(true));
      const result = generator.next().value;

      expect(result).toEqual(expected);
    });

    it('should get the data from localStorage.', () => {
      const data = [
        { id: 1, name: 'John Doe', gender: 'Male' },
        { id: 2, name: 'Jane Doe', gender: 'Female' },
      ];

      localStorage.setItem('xls', JSON.stringify(data));
      expect(generator.next().value).toEqual(put(getDataSuccess(data)));
      localStorage.removeItem('xls');
    });

    it('or it should set the error message when an error occurs.', () => {
      errorGenerator.next();
      expect(errorGenerator.throw('error').value, put(getDataError('error')));
    });

    it('should set DATA_GETTING to false when done.', () => {
      expect(generator.next().value).toEqual(put(setDataGetting(false)));
      expect(generator.next().done).toBe(true);
    });
  });

  describe('Saving Data', () => {
    const data = [
      { id: 1, name: 'John Doe', gender: 'Male' },
      { id: 2, name: 'Jane Doe', gender: 'Female' },
    ];
    const payload = {
      filename: 'test.xls',
      entries: data,
    };
    const generator = cloneableGenerator(saveData)({ payload: { data: payload }});
    const errorGenerator = generator.clone();

    it('should set DATA_SAVING to true.', () => {
      const expected = put(setDataSaving(true));
      const result = generator.next().value;

      expect(result).toEqual(expected);
    });

    it('should save the data to localStorage.', () => {
      localStorage.clear();

      const generatorData = generator.next().value.PUT.action.payload.data;
      const localStorageData = JSON.parse(localStorage.getItem('xls'))[0];

      expect(generatorData.data).toEqual(localStorageData.data);
      expect(generatorData.filename).toEqual(localStorageData.filename);

      localStorage.clear();
    });

    it('or it should set the error message when an error occurs.', () => {
      errorGenerator.next();
      expect(errorGenerator.throw('error').value, put(saveDataError('error')));
    });

    it('should set DATA_SAVING to false when done.', () => {
      expect(generator.next().value).toEqual(put(setDataSaving(false)));
      expect(generator.next().done).toBe(true);
    });
  });

  describe('Syncing Data', () => {
    const data = [
      { id: 1, name: 'John Doe', gender: 'Male' },
      { id: 2, name: 'Jane Doe', gender: 'Female' },
    ];
    const generator = cloneableGenerator(syncData)({ payload: { data }});
    const errorGenerator = generator.clone();

    it('should set DATA_SYNCING to true.', () => {
      const expected = put(setDataSyncing(true));
      const result = generator.next().value;
  
      expect(result).toEqual(expected);
    });
  
    it('then it should pass the data to an API call.', () => {
      expect(generator.next().value).toEqual(put(syncDataSuccess(data)));
    });

    it('or it should set the error message when an error occurs.', () => {
      errorGenerator.next();
      expect(errorGenerator.throw('error').value, put(syncDataError('error')));
    });
  
    it('then it should set DATA_SYNCING to false.', () => {
      expect(generator.next().value).toEqual(put(setDataSyncing(false)));
      expect(generator.next().done).toBe(true);
    });
  });
});
