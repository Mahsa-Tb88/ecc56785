import React, { useEffect, useState } from "react";
import "./header.css";
import { getAllCalls } from "../../utility/api";
import Menu from "../Menu/Menu";
import HeaderTop from "../HeaderTop/HeaderTop";

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
    <div className="header position-fixed">
      {isLoading ? (
        <span className="d-flex justify-content-center">loading</span>
      ) : error ? (
        <span className="d-flex justify-content-center text-danger">
          {error}
        </span>
      ) : (
        <div>
          <HeaderTop listCalls={listCalls} />
          <Menu />
        </div>
      )}
    </div>
  );
}
