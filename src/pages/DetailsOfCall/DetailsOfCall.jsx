import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailCall, updateArchiveCall } from "../../utility/api";
import "./detailsOfCall.css";

export default function DetailsOfCall() {
  const [detailCall, setDetailCall] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isArchived, setIsArchived] = useState(false);

  let day, month, year, formattedTime;
  if (detailCall.created_at) {
    const dateOfCall = new Date(detailCall.created_at);
    day = dateOfCall.getDate();
    const options = { month: "long" };
    month = new Intl.DateTimeFormat("en-US", options).format(dateOfCall);
    year = dateOfCall.getFullYear();
    formattedTime = dateOfCall.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Use 12-hour AM/PM format
    });
  }

  //calculate duration of call

  let durationCall;
  if (detailCall.duration < 60) {
    durationCall = detailCall.duration + "s";
  } else if (detailCall.duration >= 60 && detailCall.duration < 3600) {
    const min = Math.floor(detailCall.duration / 60);
    const sec = detailCall.duration - min * 60;
    durationCall = min + "m " + sec + "s ";
  } else {
    const hour = Math.floor(detailCall.duration / 3600);
    const min = Math.floor((detailCall.duration - hour * 3600) / 60);
    durationCall = hour + "h " + min + "m ";
  }

  //First get detail of call using params and route API
  const params = useParams();
  useEffect(() => {
    const timeOut = setTimeout(fetchgetDetailCall, 20);
    return () => clearTimeout(timeOut);
  }, []);

  async function fetchgetDetailCall() {
    setIsLoading(true);
    setError(false);
    const id = params.id;
    const result = await getDetailCall(id);

    if (result) {
      setDetailCall(result);
      setIsLoading(false);
      if (result.is_archived) {
        setIsArchived(true);
      } else {
        setIsArchived(false);
      }
    } else {
      setError(true);
    }
  }

  // change "is_archived" to opposite
  async function handleArchive(id) {
    const is_archived = !isArchived;
    const result = await updateArchiveCall(id, is_archived);
    if (result == "Call had been updated.") {
      setIsArchived(!isArchived);
    } else {
      setError(result.errors[0].message);
    }
  }

  return (
    <div className="DetailsOfCall">
      {isLoading ? (
        <div className="text-center text-white my-5 ">
          <span className="text-info px-2 py-2 fw-semibold ">Loading</span>
        </div>
      ) : error ? (
        <div className="text-center text-white my-5 ">
          <span className="text-danger px-2 py-2 fw-semibold ">{error}</span>
        </div>
      ) : (
        <div className="detail w-75 rounded-1 mx-auto py-3 px-3 d-flex flex-column justify-content-center align-items-start my-5">
          <div className="mb-2">
            <span className="text fw-semibold"> From:</span>{" "}
            <span className="text-secondary">{detailCall.from}</span>
          </div>
          <div className="mb-2">
            <span className="text fw-semibold"> To: </span>
            <span className="text-secondary">{detailCall.to}</span>
          </div>
          <div className="mb-2">
            <span
              className={
                detailCall.call_type == "answered"
                  ? "bg-success callType"
                  : "bg-danger callType"
              }
            ></span>
            <span
              className={
                detailCall.call_type == "answered"
                  ? "text-success ms-1 fw-semibold"
                  : "text-danger ms-1 fs-semibold"
              }
            >
              {detailCall.call_type}
            </span>
            <span className="fw-semibold duration ms-2">{durationCall}</span>
          </div>
          <div className="mb-2">
            <span
              className={
                detailCall.is_archived
                  ? "archivedStatus fw-semibold"
                  : "UnarchivedStatus fw-semibold"
              }
            ></span>
            <span className=" fw-semibold text-info ms-1">
              {isArchived ? "archived" : "unArchived"}
            </span>
          </div>
          <div className="mb-2">
            <span className="date fw-semibold">{formattedTime} -- </span>
            <span className="date fw-semibold">
              {month} , {day} , {year}
            </span>
          </div>

          <div className="mb-2">
            <button
              className="btn fw-semibold border btn-secondary text-white"
              onClick={() => handleArchive(detailCall.id)}
            >
              {isArchived ? "Unrchived" : "Archived"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
