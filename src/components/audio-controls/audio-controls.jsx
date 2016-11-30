import classnames from 'classnames';
import React from 'react';

/**
* A simple component that wraps types of audio controls. Pass in `children` of
* any kind, which should be a list of buttons.
*/
const AudioControls = ({ children, parentClassName }) => {
  const classNames = classnames(
    "audio-controls",
    { [parentClassName]: !!parentClassName}
  );
  return (
    <div className={classNames}>
      {children}
    </div>
  );
};

AudioControls.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
    React.PropTypes.element,
  ]).isRequired,
  parentClassName: React.PropTypes.string,
};

export default AudioControls;
