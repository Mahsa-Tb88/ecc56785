import React, { useEffect, useState } from "react";
import Call from "../../components/Call/Call";
import { getAllCalls } from "../../utility/api";
import "./listCalls.css";

export default function ListCalls() {
  const [listCalls, setListCalls] = useState([]);
  const [isLoadign, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  //fetch list of calls
  useEffect(() => {
    const timeOut = setTimeout(fetchAllCalls, 20);
    return () => clearTimeout(timeOut);
  }, []);

  async function fetchAllCalls() {
    setIsLoading(true);
    setError(false);
    const result = await getAllCalls();
    if (result) {
      setListCalls(result);
      setIsLoading(false);
    } else {
      setError("something went wrong");
    }
  }
  console.log(listCalls[0]);

  let day, options, month, year;
  if (listCalls[0]) {
    const dateOfCall = new Date(listCalls[0].created_at);
    day = dateOfCall.getDate();
    options = { month: "long" };
    month = new Intl.DateTimeFormat("en-US", options).format(dateOfCall);
    year = dateOfCall.getFullYear();
  }

  return (
    <div>
      {isLoadign ? (
        <div className="text-center py-5 text-info fw-semibold">
          <span>isLoding</span>
        </div>
      ) : error ? (
        <div className="text-center py-5 text-danger fw-semibold">
          <span>{error}</span>
        </div>
      ) : (
        <div className="py-5 listCalls">
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
          {listCalls.map((call, i) => {
            let preCall = i > 0 ? listCalls[i - 1] : call;
            return (
              <div key={call.id}>
                <Call call={call} preCall={preCall} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
