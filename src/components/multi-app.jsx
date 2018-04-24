import React from 'react';

import App from './app.jsx';

const MultiApp = ({ inputs, numOscillators }) => {
  const makeApps = () => {
    const apps = [];
    for (let i = 0; i < numOscillators; i += 1) {
      apps.push(<App inputs={inputs} key={`app-${i}`}/>);
    }
    return apps;
  }
  return (
    <div className="app">
      {makeApps()}
    </div>
  );
};

MultiApp.propTypes = {
  inputs: React.PropTypes.object,
  numOscillators: React.PropTypes.number,
};

MultiApp.defaultProps = {
  numOscillators: 2
};

export default MultiApp;
