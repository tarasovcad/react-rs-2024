import React, {useState} from "react";
import Search from "./Search";
import {Link} from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";

const Navbar = () => {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  function callError() {
    throw new Error("This is a test error");
  }
  if (shouldThrowError === true) {
    callError();
  }
  return (
    <div className="header max-h-[90px] py-[13px] px-[26px] flex justify-between">
      <Link to="/search/1" reloadDocument>
        <div className="logo w-[64px] h-[64px]">
          <img src="../images/logo.png" alt="Logo" />
        </div>
      </Link>

      <div className="flex gap-4">
        <ThemeToggleButton />
        <button
          className="error-button"
          onClick={() => setShouldThrowError(true)}>
          Throw error
        </button>
        <Search />
      </div>
    </div>
  );
};

export default Navbar;
