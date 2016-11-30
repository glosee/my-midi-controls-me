import React from 'react';

const ErrorTile = props => {
  console.log(error.stack);
  return (
    <div className="error-tile">
      <h1>ERROR</h1>
      <p>{props.error.toString()}</p>
      <p>{props.error.stack}</p>
    </div>
  );
};

export default ErrorTile;
