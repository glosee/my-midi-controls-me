import classnames from 'classnames';
import React from 'react';

import AudioControls from './audio-controls.jsx';
import { WAVE_TYPES } from '../../utils/audio-utils.js';

const WaveTypePicker = ({ onChange, selectedWaveType }) => {
  return (
    <AudioControls parentClassName="audio-controls--wave-type">
      <form className="wave-type-picker" onChange={onChange}>
        <ul className="wave-type-picker__wave-types">
          {
            Object.keys(WAVE_TYPES).map((type) => {
              const waveType = WAVE_TYPES[type];
              const classname = classnames(
                'audio-controls__control',
                'audio-controls__control--wave-type',
                `audio-controls--${waveType}`);
              const id = `wave-type-control--${waveType}`;
              return (
                <li key={id}>
                  <label htmlFor={id} className="audio-controls__control-label">
                    <input
                      id={id}
                      defaultChecked={selectedWaveType === waveType}
                      className={classname}
                      name="wave-type-control"
                      type="radio"
                      value={waveType} />
                      <span>{waveType}</span>
                  </label>
                </li>
              );
            })
          }
        </ul>
      </form>
    </AudioControls>
  );
};

export default WaveTypePicker;
