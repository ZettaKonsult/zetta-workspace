import React from 'react';

export default props => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      margin: '15px',
      padding: '1em',
      width: '500px',
      border: '1px solid grey',
    }}
  >
    <h1>{props.title}</h1>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        height: '200px',
        margin: '15px',
        textAlign: 'left',
      }}
    >
      {props.children}
    </div>
    <button>Accept</button>
  </div>
);
