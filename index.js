import React from 'react';
import ReactDOM from 'react-dom';

import { getMIDIInputs } from './src/utils/midi-utils.js';
import App from './src/components/app.jsx';
import ErrorTile from './src/components/error.jsx';

const renderApp = ({ inputs }) => (
  ReactDOM.render(<App inputs={inputs} />, document.getElementById('root'))
);

const renderError = (error) => (
  ReactDOM.render(<ErrorTile error={error} />, document.getElementById('root'))
);

// The catch chain here catches errors from both `getMIDIInputs` and `renderApp`
getMIDIInputs(navigator).then(renderApp).catch(renderError);
