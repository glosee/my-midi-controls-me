/**
* Midi initializer.
*/

// check if user has access to midi API

// if not, then reject promise

// if yes, then resolve with the midi inputs

const supportsMIDI = (_navigator) => {
  return typeof _navigator.requestMIDIAccess === 'function';
};

const getMIDIInputs = (_navigator) => {
  if (!supportsMIDI(_navigator)) {
    return Promise.reject('MIDI not supported. Try Chrome or Opera.');
  }
  // This returns a Promise
  return _navigator.requestMIDIAccess();
};

export {
  getMIDIInputs,
}
