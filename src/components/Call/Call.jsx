import React from "react";
import "./call.css";
import { RiPhoneFill } from "react-icons/ri";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import { PiDotsThreeVerticalThin } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function Call({ call }) {
  //caculate date and time
  const dateOfCall = new Date(call.created_at);
  const day = dateOfCall.getDay();
  const options = { month: "long" };
  const month = new Intl.DateTimeFormat("en-US", options).format(dateOfCall);
  const year = dateOfCall.getFullYear();
  const formattedTime = dateOfCall.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Use 12-hour AM/PM format
  });
  const arrayOfTime = formattedTime.split(" ");

  return (
    <div className="call py-1 mb-4 py-md-4 ">
      <div className="d-flex justify-content-center align-items-center ">
        <span className="dot"></span>
        <div className="mx-md-3 mx-1 text ">
          <span>{month}</span>
          <span className="ps-1 pe-1">,</span>
          <span className="me-2">{day}</span>
          <span>{year}</span>
        </div>
        <span className="dot"></span>
      </div>
      <div className="w-75 mx-auto border rounded-2 py-3 py-md-5 ps-2 mt-2 d-flex justify-content-between align-items-center">
        <div className=" d-flex align-items-center">
          <div className="position-relative me-3 me-md-5">
            <span className="icon-phone">
              <RiPhoneFill />
            </span>
            <span>
              {call.direction == "inbound" && call.call_type == "answered" ? (
                <span className="text-success">
                  <FaLongArrowAltUp className="icon-arrow " />
                </span>
              ) : call.direction == "inbound" &&
                call.call_type !== "answered" ? (
                <span className="text-danger">
                  <FaLongArrowAltUp className="icon-arrow " />
                </span>
              ) : call.direction == "outbound" &&
                call.call_type == "answered" ? (
                <span className="text-success">
                  <FaLongArrowAltDown className="icon-arrow " />
                </span>
              ) : call.direction == "outbound" &&
                call.call_type !== "answered" ? (
                <span className="text-danger">
                  <FaLongArrowAltDown className="icon-arrow " />
                </span>
              ) : (
                ""
              )}
            </span>
          </div>
          <div className="d-flex flex-column justify-content-center">
            <span>{call.from}</span>
            <span className=" text-small">try to call on {call.from}</span>
          </div>
        </div>
        <Link
          to={`/detailsOfCall/${call.id}`}
          className="time-section text-decoration-none d-flex align-items-center py-1 py-md-2 rounded-start"
        >
          <span className="fs-5 threeDotIcon">
            <PiDotsThreeVerticalThin />
          </span>
          <span className="time me-1">{arrayOfTime[0]}</span>
          <span className="time border border-end-0  rounded-start">
            {arrayOfTime[1]}
          </span>
        </Link>
      </div>
    </div>
  );
}
