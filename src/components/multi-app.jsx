import React from 'react';

import App from './app.jsx';

const MultiApp = ({inputs}) => (
  <div className="app">
    <App {...{ inputs }} />
    <App {...{ inputs }} />
  </div>
);

MultiApp.propTypes = {
  inputs: React.PropTypes.object,
};

export default MultiApp;
