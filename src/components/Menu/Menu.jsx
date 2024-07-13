import React from "react";
import "./menu.css";
import { MdPhone } from "react-icons/md";
import { PiArchive } from "react-icons/pi";

import { PiDotsThreeVerticalThin } from "react-icons/pi";
import { NavLink, useLocation } from "react-router-dom";

export default function Menu() {
  //get location to change css clase
  const { pathname } = useLocation();

  return (
    <div className="menu py-1 px-md-1">
      <div className="row m-0 menuItems px-0 py-0   rounded-top-2  d-flex justify-content-between align-items-center">
        <div className="col-4  justify-content-center  d-flex align-items-center px-md-4 px-0">
          <div className="icon-phone d-flex justify-content-center align-items-center  me-md-2">
            <MdPhone />
          </div>
          <span className="fw-bold title-activity" to="/">
            Activity
          </span>
        </div>
        <div className="col-8 px-0 d-flex flex-grow-1 justify-content-around align-items-center section-items ">
          <h2 className="item d-flex justify-content-center align-items-center mb-0  ">
            <NavLink
              to="inbox"
              className="d-flex justify-content-center align-items-center text-decoration-none"
            >
              Inbox
            </NavLink>
          </h2>
          <span>
            <PiDotsThreeVerticalThin />
          </span>
          <h2 className="item d-flex justify-content-center align-items-center mb-0 ">
            <NavLink
              to="calls"
              className="d-flex justify-content-center align-items-center text-decoration-none"
            >
              All calls
            </NavLink>
          </h2>
          <span>
            <PiDotsThreeVerticalThin />
          </span>
          <div>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <span className="line1"></span>
                <span className="circle"></span>
                <span className="line2"></span>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <span className="line2"></span>
                <span className="circle"></span>
                <span className="line1"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavLink to="archive" className="archiveCallsBtn text-decoration-none">
        <div className="archiveCalls-container ms-2 px-2 px-md-4  gap-3 rounded-1 rounded-top-0">
          <span className="icon-archive me-1 me-md-3">
            <PiArchive
              className={pathname == "/archive" ? "archivePage" : ""}
            />
          </span>
          <span
            className={
              pathname == "/archive"
                ? "archivePage text fw-semibold"
                : "text fw-semibold"
            }
          >
            Archives all calls
          </span>
        </div>
      </NavLink>
    </div>
  );
}
