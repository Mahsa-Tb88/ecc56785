import React from "react";
import Header from "./components/Header/Header";

import { Outlet } from "react-router-dom";
import "./app.css";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <div className="wrapper position-relative">
      <div className="app mx-auto my-4 border border-1">
        <Header />
        <div className="pb-5 outlet">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
