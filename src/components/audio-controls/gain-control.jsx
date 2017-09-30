import React from 'react';

import AudioControls from './audio-controls.jsx';
import RangeControl from './range-control.jsx';

const MAX = 1;
const MIN = 0;
const STEP = 0.05;

const MuteButton = ({onTouch, isMuted}) => {
    const msg = isMuted ? 'unmute' : 'mute';
    return <button className='audio-controls__mute-button' onClick={onTouch}>{msg}</button>;
};

// const Control = ({onChange, value}) => (
//     <label htmlFor="gain-rate">
//         Volume: <input id="gain-rate" name="gain-rate" type="range" min={MIN} max={MAX} step={STEP} onChange={onChange} />
//         <output htmlFor="gain-rate">{value}</output>
//     </label>
// );

class GainControl extends React.Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            isMuted: false,
        };
    }

    // componentWillReceiveProps(props) {
    //     this.setState({ value: props.initial });
    // }

    // _onChange(e) {
    //     const val =  e.target.value;
    //     this.props.onChange(val);
    //     this.setState({ value: val });
    // }

    _onMuteTouch(e) {
        const muted = !this.state.isMuted;
        this.props.mute(muted);
        this.setState({ isMuted: muted });
    }

    render() {
        const { value, isMuted } = this.state;
        return (
            <AudioControls parentClassName="audio-controls--gain">
                <MuteButton onTouch={this._onMuteTouch.bind(this)} isMuted={isMuted} />
                <RangeControl
                    onChange={this.props.onChange}
                    id='gain-control'
                />
            </AudioControls>
        );
    }
}

GainControl.propTypes = {
    initial: React.PropTypes.number,
    onChange: React.PropTypes.func.isRequired,
    mute: React.PropTypes.func.isRequired,
};

export default GainControl;
