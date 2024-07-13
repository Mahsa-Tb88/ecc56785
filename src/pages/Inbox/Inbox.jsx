import React, { useEffect, useState } from "react";
import { getAllCalls, updateArchiveCall } from "../../utility/api";
import Call from "../../components/Call/Call";
import "./inbox.css";

export default function Inbox() {
  const [unArchivedCalls, setUnarchivedCalls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  //fetch to get list of calls
  useEffect(() => {
    const timeOut = setTimeout(fetchAllCalls, 20);
    return () => clearTimeout(timeOut);
  }, []);

  async function fetchAllCalls() {
    setIsLoading(true);
    setError(false);
    const result = await getAllCalls();
    if (result) {
      const filterCalls = result.filter((call) => call.is_archived == false);
      setUnarchivedCalls(filterCalls);
      setIsLoading(false);
    } else {
      setError("Error Connection");
    }
  }

  // change all calls to archive
  async function handlerToArchive() {
    setIsLoading(true);
    setError(false);

    const result = await getAllCalls();

    result.forEach(async (call) => {
      if (!call.is_archived) {
        const is_archived = true;
        const changeToArchivedCall = await updateArchiveCall(
          call.id,
          is_archived
        );

        if (changeToArchivedCall !== "Call had been updated.") {
          setError(result.errors[0].message);
          return;
        }
      }
    });

    setUnarchivedCalls([]);
    setIsLoading(false);
  }

  return (
    <div className="pt-md-3 pt-1">
      {isLoading ? (
        <div className="text-center ">
          <span className="my-5 d-inline-block text-info fw-bold">
            IsLoading
          </span>
        </div>
      ) : error ? (
        <div className="text-center">
          <span className=" my-5 d-inline-block text-danger">{error}</span>
        </div>
      ) : (
        <div>
          <div
            className="text-left ms-2 ms-md-3 mb-4 mb-md-0 mt-md-4 mt-2"
            onClick={handlerToArchive}
          >
            <button className="archivedBtn bg-secondary border-0 text-white rounded-1 fw-semibold">
              Archived all calls
            </button>
          </div>
          {!unArchivedCalls.length ? (
            <div className="my-3 my-md-5 py-md-4 py-2 px-2 text-center  w-75 mx-auto rounded bg-light">
              <h3 className="message mb-0 ">There are no unarchived calls.</h3>
            </div>
          ) : (
            <div className="">
              {unArchivedCalls.map((call) => {
                return (
                  <div key={call.id}>
                    <Call call={call} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
