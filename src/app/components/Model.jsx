import React from "react";

export const Model = ({ children, handleClose }) => {
  return (
    <div className="model-container">
      <div className="model">
        <span className="close-btn" onClick={() => handleClose(false)}>
          X
        </span>
        {children}
      </div>
    </div>
  );
};
