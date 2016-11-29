import React from 'react';

const ErrorTile = props => {
  return (
    <div className="error-tile">
      <h1>ERROR</h1>
      <p>{props.error.toString()}</p>
    </div>
  );
};

export default ErrorTile;
