import React from 'react';
import PropTypes from 'prop-types';
import { Online } from 'react-detect-offline';
import OnlineStatus from '../../../common/components/online-status';

const Sync = ({ onSync }) => (
  <div>
    <OnlineStatus />
    <Online>
      <button
        type="button"
        className="btn btn-sync"
        onClick={onSync}
      >
        Sync
      </button>
    </Online>
  </div>
);

Sync.propTypes = {
  onSync: PropTypes.func.isRequired,
};

Sync.defaultProps = {
  onSync: () => console.log('Syncing data.'),
};

export default Sync;
