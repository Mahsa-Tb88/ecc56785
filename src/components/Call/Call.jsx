import React, { useEffect, useState } from "react";
import "./call.css";
import { RiPhoneFill } from "react-icons/ri";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import { PiDotsThreeVerticalThin } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function Call({ call, preCall }) {
  console.log(call, preCall);

  function getDateOfCall(date) {
    const dateOfCall = new Date(date);
    const day = dateOfCall.getDate();
    const options = { month: "long" };
    const month = new Intl.DateTimeFormat("en-US", options).format(dateOfCall);
    const year = dateOfCall.getFullYear();

    const formattedTime = dateOfCall.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Use 12-hour AM/PM format
    });
    const arrayOfTime = formattedTime.split(" ");

    return { day, month, year, formattedTime, arrayOfTime };
  }

  let dateOfCurrentCall, dateCuurent, dateOfPrevCall, datePrev, phoneNumber;

  if ((call, preCall)) {
    dateOfCurrentCall = getDateOfCall(call.created_at);
    dateCuurent =
      dateOfCurrentCall.day + dateOfCurrentCall.month + dateOfCurrentCall.year;
    dateOfPrevCall = getDateOfCall(preCall.created_at);
    datePrev = dateOfPrevCall.day + dateOfPrevCall.month + dateOfPrevCall.year;
    phoneNumber = call.from == 2 ? call.to : call.from;
  }
  return (
    <div className="call pb-1 pb-md-3  mb-2 ">
      {dateCuurent !== datePrev && (
        <div className="d-flex justify-content-center align-items-center ">
          <span className="dot"></span>
          <div className="mx-md-3 mx-1 text  ">
            <span>{dateOfCurrentCall.month}</span>
            <span className="ps-1 pe-1">,</span>
            <span className="me-2">{dateOfCurrentCall.day}</span>
            <span>{dateOfCurrentCall.year}</span>
          </div>
          <span className="dot"></span>
        </div>
      )}

      <div className="w-75 mx-auto border rounded-2 py-3 py-md-5 ps-2 mt-2 d-flex justify-content-between align-items-center">
        <div className=" d-flex align-items-center">
          <div className="position-relative me-3 me-md-5">
            <span className="icon-phone">
              <RiPhoneFill />
            </span>
            <span>
              {call.direction == "inbound" && call.call_type == "answered" ? (
                <span className="text-success">
                  <FaLongArrowAltUp className="icon-arrow" />
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
            <span className="phoneNumber fw-semibold">{phoneNumber}</span>
            <span className=" text-small phoneNumber">
              try to call on {phoneNumber}
            </span>
          </div>
        </div>
        <Link
          to={`/detailsOfCall/${call.id}`}
          className="time-section text-decoration-none d-flex align-items-center py-1 py-md-2 rounded-start"
        >
          <span className="fs-5 threeDotIcon">
            <PiDotsThreeVerticalThin />
          </span>
          <span className="time me-1">{dateOfCurrentCall?.arrayOfTime[0]}</span>
          <span className="time border border-end-0  rounded-start">
            {dateOfCurrentCall?.arrayOfTime[1]}
          </span>
        </Link>
      </div>
    </div>
  );
}
