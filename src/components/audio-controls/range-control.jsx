import React from 'react';

import AudioControl from './audio-controls.jsx';

class RangeControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue ? props.initialValue : props.min,
    };
  }

  _onChange(e) {
    const val =  e.target.value;
    this.props.onChange(val);
    this.setState({ value: val });
  }

  render() {
    const { value } = this.state;
    const { id, label } = this.props;
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

RangeControl.defaultProps = {
  initialValue: 0,
  min: 0,
  max: 1,
};

export default RangeControl;
