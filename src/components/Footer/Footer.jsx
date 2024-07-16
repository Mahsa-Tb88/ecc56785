import React, { useEffect, useState } from "react";
import "./footer.css";
import { MdPhone } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { BiSolidGrid } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { PiRadioButtonDuotone } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import { getAllCalls } from "../../utility/api";

export default function Footer() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [listCallsMissed, setListCallsMissed] = useState([]);
  const [listCallsVoiceMails, setListCallsVoiceMails] = useState([]);

  //fetch all calls to show number of miss calls in bottom menu
  useEffect(() => {
    const timeOut = setTimeout(fetchAllCalls, 20);
    return () => clearTimeout(timeOut);
  }, []);

  async function fetchAllCalls() {
    setIsLoading(true);
    setError(false);
    const result = await getAllCalls();

    if (result.length >= 0) {
      const filteredCallVoiceMail = result.filter((call) => {
        return call.call_type == "voicemail" && call.direction == "inbound";
      });
      setListCallsVoiceMails(filteredCallVoiceMail);
      setIsLoading(false);
    } else {
      setError("Error Connection");
    }

    if (result.length >= 0) {
      const filteredCallMiss = result.filter((call) => {
        return call.call_type == "missed" && call.direction == "inbound";
      });

      setListCallsMissed(filteredCallMiss);

      setIsLoading(false);
    } else {
      setError("Error Connection");
    }
  }
  return (
    <div className="position-absolute  footer-container">
      {isLoading ? (
        <div className="text-center my-5">
          <span className="fw-semibold">loading</span>
        </div>
      ) : error ? (
        <div className="text-center my-5">
          <span className="fw-semibold text-danger">{error}</span>
        </div>
      ) : (
        <div className="footer">
          <div className="d-flex justify-content-around align-items-center">
            <div className="link">
              <NavLink
                to="/"
                className=" d-flex justify-content-between align-items-center position-relative"
              >
                <div>
                  <MdPhone className="icon-phone icon" />
                </div>
                {listCallsMissed.length > 0 && (
                  <span className="NumberOfMissCall position-absolute  text-white rounded-circle d-flex justify-content-center align-items-center">
                    {listCallsMissed.length}
                  </span>
                )}
              </NavLink>
            </div>
            <div className="link ">
              <NavLink
                to="contacts"
                className="d-flex justify-content-center align-items-center"
              >
                <FaUserLarge className="icon-user icon" />
              </NavLink>
            </div>

            <div className=" ">
              <Link className="d-flex justify-content-center align-items-center">
                <span className="icon-grid-container rounded-circle d-flex justify-content-center align-items-center">
                  <BiSolidGrid className="icon-grid " />
                </span>
              </Link>
            </div>

            <div className="link ">
              <NavLink
                to="setting"
                className="d-flex justify-content-center align-items-center"
              >
                <IoMdSettings className="icon-setting icon" />
              </NavLink>
            </div>

            <div className="link">
              <NavLink
                to="home"
                className="d-flex justify-content-between align-items-center position-relative"
              >
                <span>
                  <PiRadioButtonDuotone className="icon-dot icon" />
                </span>
                {listCallsVoiceMails.length > 0 && (
                  <span className="NumberOfMissCall position-absolute text-white rounded-circle d-flex justify-content-center align-items-center">
                    {listCallsVoiceMails.length}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
