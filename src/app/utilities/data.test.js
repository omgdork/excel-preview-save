import { getData, saveData } from './data';

describe('Data Utilities', () => {
  afterEach(() => {
    localStorage.clear();
  });
  
  describe('Get Data', () => {
    it('should return an empty array if there are no records.', () => {
      expect(getData()).toEqual([]);
    });

    it('should return an array of items if records exist.', () => {
      const data = [
        { id: 1, name: 'John Doe', gender: 'Male' },
        { id: 2, name: 'Jane Doe', gender: 'Female' },
      ];
      
      localStorage.setItem('xls', JSON.stringify(data));

      expect(getData()).toEqual(data);
    });
  });

  describe('Save Data', () => {
    it('should save the new item and return an updated array of items.', () => {
      const data = [
        { id: 1, name: 'John Doe', gender: 'Male' },
        { id: 2, name: 'Jane Doe', gender: 'Female' },
      ];

      expect(saveData(data)).toEqual(JSON.parse(localStorage.getItem('xls')).pop());
    });
  });
});
