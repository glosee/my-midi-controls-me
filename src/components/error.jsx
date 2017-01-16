import React from 'react';

const ErrorTile = props => {
  return (
    <div className="error-tile">
      <h1>ERROR</h1>
      <p>{props.error && props.error.toString()}</p>
      <p>{props.error && props.error.stack}</p>
    </div>
  );
};

export default ErrorTile;
