import React from 'react';
import PropTypes from 'prop-types';

const DataGrid = ({ data, noDataMessage, onSelect }) => {
  if (!data.length) {
    return noDataMessage ? (<p className="no-records">{noDataMessage}</p>) : null;
  }

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((field, i) => (<th key={i}>{field}</th>))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} {...onSelect && row.id ? { className: 'selectable', onClick: () => onSelect(row.id) } : ''}>
            {Object.values(row).map((value, j) => (<td key={j}>{value}</td>))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

DataGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  noDataMessage: PropTypes.string.isRequired,
};

DataGrid.defaultProps = {
  data: [],
  noDataMessage: 'No records.',
  onSelect: null,
};

export default DataGrid;
