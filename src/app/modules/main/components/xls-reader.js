import React, { Component } from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import Modal from '../../../common/components/modal';
import DataGrid from '../../../common/components/data-grid';

class XLSReader extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.readFile = this.readFile.bind(this);
    this.state = {
      filename: '',
      entries: [],
      isPreview: false,
    };
  }

  /**
   * Handles the save button click event.
   */
  handleSave() {
    const { filename, entries } = this.state;

    this.props.onSave({
      filename,
      entries,
    });

    this.handleCancel();
  }

  /**
   * Handles the cancel button click event.
   */
  handleCancel() {
    this.setState({
      filename: '',
      entries: [],
      isPreview: false,
    });
  }

  /**
   * Parses the excel file into an object.
   * @param {Event} e - The file input change event object.
   */
  readFile(e) {
    const fileInput = e.target;
    const file = fileInput.files[0];

    if (!file) {
      this.handleCancel();
      return;
    }

    const reader = new window.FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // From https://stackoverflow.com/a/38150490
      const sheets = workbook.SheetNames;

      sheets.forEach((name) => {
        const worksheet = workbook.Sheets[name];
        const headers = {};
        const rows = [];

        for (let prop in worksheet) {
          if (prop[0] === '!') {
            continue;
          }

          // Parse out the column, row, and value.
          let startOfCellRowString = 0; // e.g. A1 = 1, AA6 = 2, AA10 = 2

          for (let i = 0, length = prop.length; i < length; i++) {
            if (!isNaN(prop[i])) {
              startOfCellRowString = i;
              break;
            }
          }

          const column = prop.substring(0, startOfCellRowString);
          const row = parseInt(prop.substring(startOfCellRowString), 10);
          const value = worksheet[prop].v;

          // Store header names.
          if (row === 1 && value) {
            headers[column] = value;
            continue;
          }

          if (!rows[row]) {
            rows[row] = {};
          }

          rows[row][headers[column]] = value;
        }

        // Drop those first two rows which are empty.
        rows.shift();
        rows.shift();

        this.setState({
          filename: file.name,
          entries: rows,
          isPreview: true,
        });

        fileInput.value = null;
      });
    };

    reader.readAsArrayBuffer(file);
  }

  render() {
    return (
      <div className="">
        <input
          type="file"
          accept=".xls, .xlsx, .csv"
          onChange={this.readFile}
        />
        {this.state.entries.length > 0 && (
          <Modal
            title="Preview"
            isShown={this.state.isPreview}
            btnConfirm={{ text: 'Save', onClick: this.handleSave }}
            btnCancel={{ text: 'Cancel', onClick: this.handleCancel }}>
            <DataGrid data={this.state.entries} />
          </Modal>
        )}
      </div>
    );
  }
}

XLSReader.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default XLSReader;
