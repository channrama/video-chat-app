
// client/src/components/Controls.js
import React from 'react';

const Controls = ({ playStop, muteUnmute }) => {
  return (
    <div className="controls">
      <button onClick={playStop}>Play/Stop Video</button>
      <button onClick={muteUnmute}>Mute/Unmute Audio</button>
    </div>
  );
};

export default Controls;
