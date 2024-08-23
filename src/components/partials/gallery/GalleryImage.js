import React, { useState } from "react";
import { Modal } from "reactstrap";
import Link from "next/link";

const ImageContainer = ({ img }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  return (
    <Link
      className="d-content"
      onClick={(ev) => {
        ev.preventDefault();
        toggle();
      }}
      href="#gallery"
      legacyBehavior
    >
      <div className="gallery-image popup-image">
        <img className="w-100 rounded-top" src={img} alt="" />
        <Modal isOpen={open} toggle={toggle} size="large">
          <button type="button" className="mfp-close" onClick={toggle}>
            ×
          </button>
          <img
            className="w-100 rounded-top"
            style={{ height: "100%" }}
            src={img}
            alt=""
          />
        </Modal>
      </div>
    </Link>
  );
};

export default ImageContainer;