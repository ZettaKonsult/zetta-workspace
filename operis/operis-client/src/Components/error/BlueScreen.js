// @flow
// This component is shown as a full replacement for the entire app in production whenever an error happens that would otherwise crash the app
import React from 'react';

const BlueScreen = () => {
  return (
    <div>
      <h1>Something went wrong</h1>
      <h2>
        Sorry about the technical issues. Staff have been notified of the
        problem and should resolve it soon.
      </h2>
    </div>
  );
};

export default BlueScreen;
