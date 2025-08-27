import React from 'react';

// ProgressBar component displays a visual progress bar based on percentage

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">


      {/* Filled portion of the bar, capped at 100% */}
      <div 
        className="progress-fill" 
        style={{ width: `${Math.min(progress, 100)}%` }}
      >
        {/* Text showing the progress percentage */}
        <span className="progress-text">{progress.toFixed(1)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;