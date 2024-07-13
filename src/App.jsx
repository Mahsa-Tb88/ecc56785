import React from "react";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";

import { Outlet } from "react-router-dom";
import "./app.css";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <div className="wrapper position-relative">
      <div className="app mx-auto my-4 border border-1">
        <div className="">
          <Header />
          <Menu />
          <div className="pb-5">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
