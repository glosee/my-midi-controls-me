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
    // if(msg.data[0] === 248) {
    //   return;
    // }
    // this.setState({ messages: this.state.messages.concat([msg]) });
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

  render() {
    console.log(this.state.messages);
    return (
      <div className="midi-controller">
        <h2>I am a MIDI Controller</h2>
        <ul>
          {/* lazy assumptions */}
          {this.state.messages.map((msg, id) => <li key={`midi-message-${id}`}>{msg.toString()}</li>)}
        </ul>
      </div>
    );
  }
}

export default MIDIController;
