import React from 'react';

class MIDIController extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentWillMount() {
    this._setListeners();
  }

  compnentWillUpdate() {

  }

  onMIDIMessage(msg) {
    const { data } = msg;
    const cmd = data[0] >> 4;
    const channel  = data[0] & 0xf;
    const type = data[0] & 0xf0;
    const note = data[1];
    const velocity = data[2];

    switch (type) {
    case 144: // noteOn message
      this.noteOn(note, velocity);
      break;
    case 128: // noteOff message
      this.noteOff(note, velocity);
      break;
    default:
      break;
    }
  }

  noteOn(note, velocity) {
    this.player(note, velocity);
    this.props.playNote(note, velocity);
  }

  noteOff(note, velocity) {
    this.player(note, velocity);
  }

  player(note, velocity) {
    console.log('note played', note, velocity);
  }

  _setListeners() {
    const values = this.props.inputs.values();
    for (let input = values.next();
      input && !input.done;
      input = values.next()) {
      // Each time there is a MIDI message call the `onMIDIMessage` method
      input.value.onmidimessage = this.onMIDIMessage.bind(this);
    }
  }

  _noMidiInputs() {
    return (
      <div className="midi-controller__no-inputs-message">
        <p>There are no MIDI inputs detected. Please ensure your MIDI controller is detected by your computer, and try refreshing the browser window.</p>
        <p>You can still play with the browser controls mind you. Have at 'er.</p>
      </div>
    );
  }

  _midiMessages() {
    <div className="midi-controller__message-centre">
      <h2>I am a MIDI Controller</h2>
      <ul>
        {this.state.messages.map((msg, id) => <li key={`midi-message-${id}`}>{msg.toString()}</li>)}
      </ul>
    </div>
  }

  render() {
    return (
      <div className="midi-controller">
        {this.props.inputs.size === 0 ? this._noMidiInputs() : this._midiMessages()}
      </div>
    );
  }
}

export default MIDIController;
