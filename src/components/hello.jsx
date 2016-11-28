import React from 'react';

const HelloWorld = props => {
  console.log(props);
  return (
    <div className="content">
      <h1>Hello MIDI</h1>
      {props.inputs.toString()}
    </div>
  );
};

export default HelloWorld;
