import classnames from 'classnames';
import React from 'react';

import { DEFAULT_FREQ, DEFAULT_DETUNE } from '../utils/audio-utils.js';
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
    this.audioContext = new AudioContext();
  }

  /****************************************
  ************* AUDIO CONTEXT *************
  ****************************************/

  _createContext() {
      this._createGain();
      this._createOsc();
      this._setGain(1);
      this._connectAndStartOsc();
  }

  _createGain() {
    this.gain = this.audioContext.createGain();
  }

  _createOsc() {
    this.osc = this.audioContext.createOscillator();
    this.osc.type = this.state.waveType;
    this.osc.frequency.value = DEFAULT_FREQ;
    this.osc.detune.value = DEFAULT_DETUNE;
  }

  _connectAndStartOsc() {
    this.osc.connect(this.gain);
    this.osc.start(0);
  }

  _setGain(val) {
    this.gain.gain.value = val;
  }

  _destroyContext() {
    this.osc = null;
    this.gain = null;
  }

  _startNoise() {
    // Don't start more than one osc at a time
    if (this.gain && this.osc) {
      return;
    }
    this._createContext();
    this.gain.connect(this.audioContext.destination);
  }

  _stopNoise() {
    this.gain && this.gain.disconnect(this.audioContext.destination);
    this._destroyContext();
  }

  /****************************************
  ************* UI LISTENERS **************
  ****************************************/

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
    this.state.playing ? this._startNoise() : this._stopNoise();
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
