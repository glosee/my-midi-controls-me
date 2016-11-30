import classnames from 'classnames';
import React from 'react';

import StartStopControls from './audio-controls/start-stop-controls.jsx';
import MIDIController from './midi-controller.jsx';

const WAVE_TYPES = {
  SAWTOOTH: 'sawtooth',
  SINE: 'sine',
  SQUARE: 'square',
  TRIANGLE: 'triangle',
};

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      playing: false,
      waveType: 'sine',
    };
  }

  _onStart(e) {
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
