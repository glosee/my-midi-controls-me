import React from 'react';

import AudioControl from './audio-controls.jsx';

class RangeControl extends React.Component {

    constructor() {
        super();
        this.state = {
            value: this.props.initialValue ? this.props.initialValue : this.props.min
        }
    }

    _onChange(e) {
        const val =  e.target.value;
        this.props.onChange(val);
        this.setState({ value: val });
    }

    render() {
        const { value } = this.state;
        return (
            <label htmlFor={id}>
                {label}
                <input {...this.props} type="range" />
                <output htmlFor={label}>{value}</output>
            </label>
        );
    }
}

RangeControl.propTypes = {
    id: React.PropTypes.string.isRequired,
    initialValue: React.PropTypes.number,
    label: React.PropTypes.string.isRequired,
    min: React.PropTypes.number.isRequired,
    max: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    step: React.PropTypes.number,
}

export default RangeControl;
