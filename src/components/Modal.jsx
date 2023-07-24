import React from "react";
import classes from "./Modal.module.css";

function Modal({children, onClose}) {
  return (
    <>
      <div className={classes.backdrop} onClick={onClose}/>
      {/* above dic will be used to render a background */}
      <dialog open className={classes.modal}>{children}</dialog>
    </>
  );
}

export default Modal;
