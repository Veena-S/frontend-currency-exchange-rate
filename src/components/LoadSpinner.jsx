import React from 'react';

export default function LoadSpinner() {
  return (
    <div className="container d-flex flex-column justify-content-center mt-5">
      <h3 className="text-center"> Loading rates...</h3>
      <div className="text-center">
        <img className="spinner-gif" src="/spinner.gif" alt="Loading rates" />
      </div>
    </div>

  );
}
