import React, { useEffect, useState } from "react";
import Call from "../../components/Call/Call";
import { getAllCalls } from "../../utility/api";
import "./listCalls.css";

export default function ListCalls() {
  const [listCalls, setListCalls] = useState([]);

  //fetch list of calls
  useEffect(() => {
    const timeOut = setTimeout(fetchAllCalls, 20);
    return () => clearTimeout(timeOut);
  }, []);

  async function fetchAllCalls() {
    const result = await getAllCalls();
    if (result) {
      setListCalls(result);
    } else {
      console.log("result");
    }
  }
  return (
    <div className="py-3 listCalls">
      {listCalls.map((call) => {
        return (
          <div key={call.id}>
            <Call call={call} />
          </div>
        );
      })}
    </div>
  );
}
