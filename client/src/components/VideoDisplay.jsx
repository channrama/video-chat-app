// client/src/components/VideoDisplay.js
import React from 'react';

const VideoDisplay = ({ stream }) => {
  return (
    <div className="video-display">
      {stream && <video className="video" srcObject={stream} autoPlay muted />}
    </div>
  );
};

export default VideoDisplay;
