import React, { useEffect, useState } from "react";
import "./archiveCalls.css";
import { getAllCalls, unArchiveAllCalls } from "../../utility/api";
import Call from "../../components/Call/Call";
import { useLocation } from "react-router-dom";

export default function ArchiveCalls() {
  const [archiveList, setArchiveList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(fetchAllCalls, 20);
    return () => clearTimeout(timeOut);
  }, []);
  //First fecth all calls to have a list of calls for filtering based on is_archived property.
  async function fetchAllCalls() {
    setIsLoading(true);
    setError(false);
    const result = await getAllCalls();

    if (result) {
      const archivedCalls = result.filter((call) => call.is_archived);
      setArchiveList(archivedCalls);
      setIsLoading(false);
    } else {
      setError(result.errors[0].message);
    }
  }

  // using route API reset Initial state (unArchived) of all calls.
  async function handlerUnarchive() {
    const result = await unArchiveAllCalls();
    if (result == "All calls have been reset.") {
      setArchiveList([]);
    } else {
      setError("Something went wrong.");
    }
  }

  return (
    <div className="archive">
      {isLoading ? (
        <div className="text-center my-5 fs-3 text-info">
          <span>Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center my-5">
          <button
            className="btn btn-danger text-white "
            onClick={() => fetchAllCalls()}
          >
            {error}
          </button>
        </div>
      ) : (
        <div>
          <div className="d-flex align-items-center ">
            <div
              className="text-left ms-2 ms-md-3 my-3"
              onClick={handlerUnarchive}
            >
              <button className=" unArchivedBtn bg-secondary text-white rounded-1 fw-semibold">
                UnArchived all calls
              </button>
            </div>
          </div>
          <div>
            {!archiveList.length ? (
              <div className="my-4 bg-light w-75 mx-auto py-3 rounded-1 text-center ">
                <h3 className="message">There are no archived calls.</h3>
              </div>
            ) : (
              archiveList.map((call, i) => {
                let preCall = i > 0 ? archiveList[i - 1] : call;
                return (
                  <div key={call.id}>
                    <Call call={call} preCall={preCall} />
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
