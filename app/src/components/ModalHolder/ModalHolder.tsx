import React from "react";
import "./ModalHolder.css";

function ModalHolder({
  children,
  onClose,
}: React.PropsWithChildren<{ onClose: () => void }>) {
  return (
    <div className="container">
      <span
        className="close-btn top-right-corner cursor-pointer"
        onClick={() => onClose()}
      >
        x
      </span>
      <div className="modal-content">{children}</div>
    </div>
  );
}

export default ModalHolder;
