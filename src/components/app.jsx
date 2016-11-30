import classnames from 'classnames';
import React from 'react';

import MIDIController from './midi-controller.jsx';
import StartStopControls from './audio-controls/start-stop-controls.jsx';
import WavePicker from './audio-controls/wave-picker.jsx';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      playing: false,
      waveType: 'sawtooth',
    };
  }

  _onStart(e) {
    this.setState({ playing: true });
  }

  _onStop(e) {
    this.setState({ playing: false });
  }

  _setWaveType(evt) {
    const type = evt.target.value || 'sine';
    this.setState({ waveType: type });
  }

  render() {
    console.log(this.state);
    return (
      <div className="app-container">
        <h1>Hello, MIDI</h1>
        <MIDIController inputs={this.props.inputs} />
        <StartStopControls onStart={this._onStart.bind(this)} onStop={this._onStop.bind(this)} />
        <WavePicker selectedWaveType={this.state.waveType} onChange={this._setWaveType.bind(this)} />
      </div>
    )
  }
}

export default App;
