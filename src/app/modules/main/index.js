import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getData,
  setDataGetting,
  saveData,
  setDataSaving,
  syncData,
  setDataSyncing,
  setErrorMessage,
} from './actions';
import Modal from '../../common/components/modal';
import DataGrid from '../../common/components/data-grid';
import Sync from './components/sync';
import XLSReader from './components/xls-reader';

class Main extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.sync = this.sync.bind(this);
    this.view = this.view.bind(this);
    this.close = this.close.bind(this);
    this.state = {
      selectedFile: {},
      hasSelectedFile: false,
    };
  }

  componentWillMount() {
    this.props.getData();
  }

  save(data) {
    this.props.saveData(data);
  }

  sync() {
    this.props.syncData(this.props.main.data.xlsData);
  }

  view(id) {
    const file = this.props.main.data.xlsData.find((item) => item.id === id);
    
    this.setState({
      selectedFile: file,
      hasSelectedFile: true,
    });
  }

  close() {
    this.setState({
      selectedFile: {},
      hasSelectedFile: false,
    });
  }

  getFormattedData() {
    return this.props.main.data.xlsData.map(({ id, filename, date }) => ({
      id,
      filename,
      date,
    }));
  }

  render() {
    return (
      <div>
        <Sync onSync={this.sync} />
        <XLSReader onSave={this.save} />
        <DataGrid
          data={this.getFormattedData()}
          noDataMessage="No files yet."
          onSelect={this.view}
        />
        <Modal
          title={this.state.selectedFile.filename}
          isShown={this.state.hasSelectedFile}
          btnCancel={{ text: 'Close', onClick: this.close }}>
          <DataGrid data={this.state.selectedFile.data} />
        </Modal>
      </div>
    )
  }
}

Main.propTypes = {
  data: PropTypes.shape({
    xlsData: PropTypes.arrayOf(PropTypes.object).isRequired,
    isOnline: PropTypes.bool.isRequired,
  }),
  ui: PropTypes.shape({
    isGettingData: PropTypes.bool.isRequired,
    isSavingData: PropTypes.bool.isRequired,
    isSyncingData: PropTypes.bool.isRequired,
  }),
};

function mapStateToProps(state) {
  return {
    main: state.main,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getData: bindActionCreators(getData, dispatch),
    setDataGetting: bindActionCreators(setDataGetting, dispatch),
    saveData: bindActionCreators(saveData, dispatch),
    setDataSaving: bindActionCreators(setDataSaving, dispatch),
    syncData: bindActionCreators(syncData, dispatch),
    setDataSyncing: bindActionCreators(setDataSyncing, dispatch),
    setErrorMessage: bindActionCreators(setErrorMessage, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
