import React from "react";


const Popup = ({ showPopup, item, onClose }) => {
    if (!showPopup) {
      return null;
    }
  
    return (
      <div className="popup">
        <p>{`${item.title} Adicionado!`}</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };

export default Popup;
