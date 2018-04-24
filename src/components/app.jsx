import classnames from 'classnames';
import React from 'react';

import { DEFAULT_FREQ, DEFAULT_DETUNE, INITIAL_GAIN } from '../utils/audio-utils.js';
import { frequencyFromNote } from '../utils/midi-utils.js';
import MIDIController from './midi-controller.jsx';
import GainControl from './audio-controls/gain-control.jsx';
import FrequencyControls from './audio-controls/frequency-control.jsx';
import RandomizerControls from './audio-controls/randomizer-control.jsx';
import StartStopControls from './audio-controls/start-stop-controls.jsx';
import WavePicker from './audio-controls/wave-picker.jsx';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      playing: false,
      waveType: 'sawtooth',
      isRandomized: false,
    };
    // Few things removed from state because we don't want to re-render every time
    // user changes the rate of randomization, or if we need to create a new context.
    this.audioContext = null;
    this.gain = null;
    this.osc = null;
    this.randomInterval = 200;
    this.currentGain = INITIAL_GAIN;
  }

  /****************************************
  ************* AUDIO CONTEXT *************
  ****************************************/

  _createContext() {
    this._destroyContext();
    this.audioContext = new AudioContext();
    this._createGain();
    this._createOsc();
    this._setAudioGain(this.currentGain);
    this._connectAndStartOsc();
  }

  _createGain() {
    if (this.gain) {
      this._cleanupGain();
    }
    this.gain = this.audioContext.createGain();
  }

  _cleanupGain() {
    this.gain = null;
  }

  _createOsc() {
    // Clear if one already exists
    if (this.osc) {
      this._cleanupOsc();
    }
    this.osc = this.audioContext.createOscillator();
    this.osc.type = this.state.waveType;
    this.osc.frequency.value = DEFAULT_FREQ;
    this.osc.detune.value = DEFAULT_DETUNE;
  }

  _cleanupOsc() {
    this.osc.stop();
    this.osc = null;
  }

  _connectAndStartOsc() {
    this.osc.connect(this.gain);
    // Start immediately
    this.osc.start(0);
  }

  _setAudioGain(val) {
    this.gain.gain.value = val;
  }

  _mute() {
    this._setAudioGain(0);
  }

  _destroyContext() {
    if (this.gain) {
      this._cleanupGain();
    }

    if (this.osc) {
      this._cleanupOsc();
    }

    if (this.audioContext) {
      this.audioContext = null;
    }
  }

  /****************************************
  ************ AUDIO FUNCTIONS ************
  ****************************************/

  _startNoise() {
    // TODO: This always starts a new one even if nothing changed...
    this._createContext();
    this.gain.connect(this.audioContext.destination);
  }

  _stopNoise() {
    this.gain && this.gain.disconnect(this.audioContext.destination);
    this._destroyContext();
  }

  _playNote(note) {
    // TODO: For some reason notes are playing even when there is no osc
    // connected to the AudioContext... can't figure out where that's coming
    // from...
    const now = this.audioContext ? this.audioContext.currentTime : 0;
    this.osc.frequency.cancelScheduledValues(0);
    this.osc.frequency.setValueAtTime(frequencyFromNote(note), now);
  }

  /****************************************
  ************* UI LISTENERS **************
  ****************************************/

  _onStart(e) {
    this.setState({ playing: true });
  }

  _onStop(e) {
    this.setState({ playing: false, isRandomized: false });
    this._clearRandomizerInterval();
  }

  _setWaveType(evt) {
    const type = evt.target.value || 'sine';
    this.setState({ waveType: type });
  }

  _onRandomizeTouch() {
    if (this.state.isRandomized) {
      this.setState({ isRandomized: false });
      this._clearRandomizerInterval();
    } else {
      this.setState({ isRandomized: true });
      this._doRandomize();
    }
  }

  _doRandomize() {
    if (!this.state.playing) {
      return;
    }
    // Clear before restarting just to be safe
    this._clearRandomizerInterval();
    const blink = () => {
      const freq = (Math.random() * 750);
      this.osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
    }
    this.interval = setInterval(blink, this.randomInterval);
  }

  _clearRandomizerInterval() {
    this.interval && clearInterval(this.interval);
  }

  _onRateChange(val) {
    this.randomInterval = val;
    this._doRandomize();
  }

  _toggleMute(doMute = false) {
    if (!this.state.playing) {
      return;
    }
    if (doMute) {
      this._mute();
    } else {
      this._changeGain(this.currentGain);
    }
  }

  /**
   * This separate method for changing the gain is to be able to update the currentGain separately
   * from the gain on the AudioNode. Necessary because we also use `_setAudioGain` for muting.
   */
  _changeGain(val = INITIAL_GAIN) {
    const typedVal = Number(val);
    this.currentGain = typedVal;
    if (this.state.playing) {
      this._setAudioGain(typedVal);
    }
  }

  _onFrequencyChange(value) {
    this.osc.frequency.setValueAtTime(value, this.audioContext.currentTime);
  }

  render() {
    this.state.playing ? this._startNoise() : this._stopNoise();
    return (
      <div className="app-container">
        <h1>Hello Oscilator</h1>
        <MIDIController inputs={this.props.inputs} playNote={this._playNote.bind(this)} />
        <StartStopControls onStart={this._onStart.bind(this)} onStop={this._onStop.bind(this)} />
        <RandomizerControls onTouch={this._onRandomizeTouch.bind(this)} isRandomized={this.state.isRandomized} onRateChange={this._onRateChange.bind(this)} />
        <FrequencyControls onFrequencyChange={this._onFrequencyChange.bind(this)} />
        <WavePicker selectedWaveType={this.state.waveType} onChange={this._setWaveType.bind(this)} />
        <GainControl onChange={this._changeGain.bind(this)} initial={0.25} mute={() => {}}/>
      </div>
    )
  }
}

export default App;
