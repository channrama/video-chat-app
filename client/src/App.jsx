import React, { useEffect, useState } from 'react';
import './App.css';
import VideoDisplay from './components/VideoDisplay';
import ChatWindow from './components/ChatWindow';
import Controls from './components/Controls';
import { io } from 'socket.io-client';
import Peer from 'peerjs';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [peer, setPeer] = useState(null);
  const [myVideoStream, setMyVideoStream] = useState(null);

  useEffect(() => {
    const newSocket = io('/');
    setSocket(newSocket);

    const newPeer = new Peer(undefined, {
      host: '/',  // Your server's URL
      port: '3030', // Your server's port
      path: '/peerjs', // Your PeerJS path
    });
    setPeer(newPeer);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMyVideoStream(stream);
      })
      .catch((err) => {
        console.error('Error accessing media devices:', err);
      });

    return () => {
      newSocket.disconnect();
      newPeer.destroy();
    };
  }, []);

  const playStop = () => {
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getVideoTracks()[0].enabled = false;
    } else {
      myVideoStream.getVideoTracks()[0].enabled = true;
    }
  };

  const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getAudioTracks()[0].enabled = false;
    } else {
      myVideoStream.getAudioTracks()[0].enabled = true;
    }
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__videos">
          <VideoDisplay stream={myVideoStream} />
        </div>
        <Controls playStop={playStop} muteUnmute={muteUnmute} />
      </div>
      <ChatWindow socket={socket} />
    </div>
  );
};

export default App;
