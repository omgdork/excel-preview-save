/**
 * Gets the xls data from storage.
 */
export function getData() {
  if (!localStorage.getItem('xls')) {
    localStorage.setItem('xls', JSON.stringify([]));
  }

  return JSON.parse(localStorage.getItem('xls'));
}

/**
 * Saves the xls data to storage.
 * @param {object} xls - The xls object.
 * @param {string} xls.id - The xls data id.
 * @param {string} xls.filename - The xls filename.
 * @param {Date} xls.date - The xls timestamp.
 * @param {[object]} xls.data - The xls data.
 * @returns {object} The xls object.
 */
export function saveData(xls) {
  let data = JSON.parse(localStorage.getItem('xls'));

  if (!data) {
    data = [];
  }

  data.push(xls);
  localStorage.setItem('xls', JSON.stringify(data));

  return xls;
}
