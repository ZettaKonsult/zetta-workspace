import React from 'react';

const ReportCard = ({ date, hours, extra, worker, workplace }) => (
  <div
    style={{
      padding: '0.5em',
      border: '1px solid grey',
      margin: '0.2em',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '5px',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h3>{date}</h3>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h3 style={{ margin: 0 }}>{worker}</h3>
        <em>{workplace}</em>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{}}>Hours: {hours}</span>
        <span>Extra: {extra}</span>
      </div>
    </div>
  </div>
);

export default ReportCard;
