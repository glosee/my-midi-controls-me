import classnames from 'classnames';
import React from 'react';

import MIDIController from './midi-controller.jsx';

const AudioControls = ({ children, parentClassName }) => {
  const classNames = classnames(
    "audio-controls",
    { [parentClassName]: !!parentClassName}
  );
  return (
    <div className={classNames}>
      {children}
    </div>
  );
};

const StartStopControls = ({ onStart, onStop }) => (
  <AudioControls parentClassName="audio-controls--start-stop">
    <button className="audio-controls__control audio-controls__control--start" onClick={onStart}>start</button>
    <button className="audio-controls__control audio-controls__control--stop" onClick={onStop}>stop</button>
  </AudioControls>
);

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      playing: false,
    };
  }

  _onStart(e) {
    console.log('on start', e);
    this.setState({ playing: true });
  }

  _onStop(e) {
    this.setState({ playing: false });
  }

  render() {
    console.log(this.state);
    return (
      <div className="app-container">
        <h1>Hello, MIDI</h1>
        <MIDIController inputs={this.props.inputs} />
        <StartStopControls onStart={this._onStart.bind(this)} onStop={this._onStop.bind(this)} />
      </div>
    )
  }
}

export default App;
