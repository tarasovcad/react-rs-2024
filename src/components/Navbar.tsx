import React, {useState} from "react";
import Search from "./Search";

const Navbar = () => {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  function callError() {
    throw new Error("This is a test error");
  }
  if (shouldThrowError === true) {
    callError();
  }
  return (
    <div className="header max-h-[90px] bg-navbar py-[13px] px-[26px] flex justify-between">
      <div className="logo w-[64px] h-[64px]">
        <img src="./images/logo.png" alt="Logo" />
      </div>
      <div className="flex gap-4">
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
