import React from 'react';

import MIDIController from './midi-controller.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <h1>Hello, MIDI</h1>
        <MIDIController inputs={this.props.inputs} />
      </div>
    )
  }
}

export default App;
