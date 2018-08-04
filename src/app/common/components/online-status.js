import React from 'react';
import { Detector } from 'react-detect-offline';

const OnlineStatus = () => (
  <Detector
    render={({ online }) => {
      return (
        <div className={['online-status', online ? 'online' : 'offline'].join(' ')}>
          {online ? 'Online' : 'Offline'}
        </div>
      );
    }}
  />
);

export default OnlineStatus;
