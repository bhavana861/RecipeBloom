import React from "react";

const Modal = ({ onClose, children }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>

        <button onClick={onClose} style={styles.close}  >
          ✕
        </button>
        {children}

      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  modal: {
    width: "400px",
    minHeight: "200px",
    background: "#f8e9f0",
    borderRadius: "20px",
    padding: "30px",
    position: "relative",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    animation: "popup 0.3s ease",
  },

  close: {
    position: "absolute",
    top: "15px",
    right: "15px",
    border: "none",
    background: "#f5f5f5",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "18px",
  }
};

export default Modal;