import React from 'react';

import AudioControls from './audio-controls.jsx';

const RandomizerControl = ({onTouch, isRandomized}) => (
    <AudioControls parentClassName="audio-controls--randomizer">
        <button className="audio-controls__control audio-controls__control--randomizer" onClick={onTouch}>{isRandomized ? 'Normalize' : 'Randomize'}</button>
    </AudioControls>
);

RandomizerControl.propTypes = {
    onTouch: React.PropTypes.func.isRequired,
    isRandomized: React.PropTypes.bool.isRequired,
};

export default RandomizerControl;