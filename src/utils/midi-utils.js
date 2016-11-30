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

// Magic from here:
// https://www.keithmcmillen.com/blog/making-music-in-the-browser-web-midi-api/
const frequencyFromNote = note => (
  440 * Math.pow(2, (note - 69) / 12)
)

export {
  getMIDIInputs,
  frequencyFromNote,
}
