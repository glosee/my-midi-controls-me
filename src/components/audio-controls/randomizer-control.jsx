import React from 'react';

import AudioControls from './audio-controls.jsx';

const MAX_RATE = 200;
const MIN_RATE = 5;
const STEP_RATE = 5;

class RandomizerControls extends React.Component { 

    
    constructor() {
        super();
        this.state = {
            value: MAX_RATE / 2,
        }
    };

    onRateChange(e) {
        const val = e.target.value;
        this.setState({ value: val });
        this.props.onRateChange(val);
    }

    _randomizedControls(onTouch, value) {
        return [
            <button key="normalize-button" className="audio-controls__control audio-controls__control--randomizer" onClick={onTouch}>Normalize</button>,
            <label key="randomrate-range" htmlFor="randomrate">
                Rate (ms): <input id="randomrate" name="randomrate" type="range" min={MIN_RATE} max={MAX_RATE} step={STEP_RATE} onChange={this.onRateChange.bind(this)} />
                <output htmlFor="randomrate">{value}</output>
            </label>,
        ];
    }

    _normalizedControls(onTouch) {
        return (<button className="audio-controls__control audio-controls__control--randomizer" onClick={onTouch}>Randomize</button>);
    }
    
    render() {
        const {onTouch, isRandomized} = this.props;
        const { value } = this.state;
        return (
            <AudioControls parentClassName="audio-controls--randomizer">
                {!isRandomized ? this._normalizedControls(onTouch) : this._randomizedControls(onTouch, value) }
            </AudioControls>
        );
    }
}

RandomizerControls.propTypes = {
    isRandomized: React.PropTypes.bool.isRequired,
    onRateChange: React.PropTypes.func.isRequired,
    onTouch: React.PropTypes.func.isRequired,
};

export default RandomizerControls;