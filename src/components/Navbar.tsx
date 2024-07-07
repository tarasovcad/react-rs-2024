import React from "react";
import Search from "./Search";

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="header max-h-[90px] bg-navbar py-[13px] px-[26px] flex justify-between">
          <div className="logo w-[64px] h-[64px]">
            <img src="./../../src/assets/images/logo.png" alt="Logo" />
          </div>
          <Search />
        </div>
      </div>
    );
  }
}
