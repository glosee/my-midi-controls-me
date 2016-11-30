import React from 'react';

import AudioControls from './audio-controls.jsx';

const StartStopControls = ({ onStart, onStop }) => (
  <AudioControls parentClassName="audio-controls--start-stop">
    <button className="audio-controls__control audio-controls__control--start" onClick={onStart}>start</button>
    <button className="audio-controls__control audio-controls__control--stop" onClick={onStop}>stop</button>
  </AudioControls>
);

StartStopControls.propTypes = {
  onStart: React.PropTypes.func.isRequired,
  onStop: React.PropTypes.func.isRequired,
};

export default StartStopControls;
