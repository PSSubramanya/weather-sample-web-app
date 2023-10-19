import React from "react";

const CustomAlert = ({ message, onClose, onOK }) => {
  return (
    <div className="custom-alert">
      <div className="custom-alert-content">
        <p>{message}</p>
        <button className="buttons ok" onClick={onClose}>
          Close
        </button>
        <button className="buttons" onClick={onOK}>
          OK
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
