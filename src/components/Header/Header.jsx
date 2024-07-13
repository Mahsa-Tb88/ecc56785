import React, { useEffect, useState } from "react";
import "./header.css";
import { getAllCalls } from "../../utility/api";

export default function Header() {
  const [listCalls, setListCalls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(fetchAllCalls, 20);
    return () => clearTimeout(timeOut);
  }, []);
//fetch list of calls for getting number of calls
  async function fetchAllCalls() {
    setIsLoading(true);
    setError(false);
    const result = await getAllCalls();
    if (result) {
      setListCalls(result);
      setIsLoading(false);
    } else {
      setError("Error Connection");
    }
  }
  return (
    <div className="header px-3 position-relative">
      {isLoading ? (
        <span className="d-flex justify-content-center">loading</span>
      ) : error ? (
        <span className="d-flex justify-content-center text-danger">{error}</span>
      ) : (
        <div>
          <div className="d-flex align-items-center justify-content-center">
            <h2 className=" title py-2 mb-0  ">
              ({listCalls.length}) Aircall Phone
            </h2>
          </div>
          <div className="d-flex justify-content-start align-items-center position-absolute container-circle">
            <span className="circle rounded-circle redCircle"></span>
            <span className=" circle rounded-circle yellowCircle mx-1 mx-md-3"></span>
            <span className=" circle rounded-circle greenCircle"></span>
          </div>
        </div>
      )}
    </div>
  );
}
