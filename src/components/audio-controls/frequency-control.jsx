import React from 'react';

import AudioControls from './audio-controls.jsx';

const MAX_RATE = 1046.50; // C6
const MIN_RATE = 65.41;  // C2
const STEP_RATE = 1;

class RandomizerControls extends React.Component {
    constructor() {
        super();
        this.state = {
            value: MAX_RATE / 2,
        };
    }

    onRateChange(e) {
        const val = e.target.value;
        this.setState({ value: val });
        this.props.onFrequencyChange(val);
    }

    _frequencyControls(value) {
        return (
            <label htmlFor="frequency">
                Freq: <input id="frequency" name="frequency" type="range" min={MIN_RATE} max={MAX_RATE} step={STEP_RATE} onChange={this.onRateChange.bind(this)} />
                <output htmlFor="frequency">{value}</output>
            </label>
        );
    }

    render() {
        const { value } = this.state;
        return (
            <AudioControls parentClassName="audio-controls--frequency">
                {this._frequencyControls(value)}
            </AudioControls>
        );
    }
}

RandomizerControls.propTypes = {
    onFrequencyChange: React.PropTypes.func.isRequired,
};

export default RandomizerControls;
