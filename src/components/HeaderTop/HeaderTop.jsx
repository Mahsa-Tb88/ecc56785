import React from "react";
import "./headerTop.css";
export default function HeaderTop({ listCalls }) {
  return (
    <div className="position-relative px-2 header-top">
      <div className="d-flex align-items-center justify-content-center">
        <h2 className="  py-2 mb-0  ">({listCalls.length}) Aircall Phone</h2>
      </div>
      <div className="d-flex justify-content-start align-items-center position-absolute container-circle">
        <span className="circle rounded-circle redCircle"></span>
        <span className=" circle rounded-circle yellowCircle mx-1 mx-md-3"></span>
        <span className=" circle rounded-circle greenCircle"></span>
      </div>
    </div>
  );
}
