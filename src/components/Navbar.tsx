import React, {useState} from "react";
import Search from "./Search";
import Link from "next/link";
import Image from "next/image";
import ThemeToggleButton from "./ui/ThemeToggleButton";

const Navbar = () => {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  function callError() {
    throw new Error("This is a test error");
  }
  if (shouldThrowError === true) {
    callError();
  }
  return (
    <div className="container">
      <div className="header max-h-[90px] py-[13px] px-[26px] flex justify-between ">
        <Link href="/search/1" prefetch={false}>
          <div className="logo w-[64px] h-[64px]">
            <Image src="/images/logo.png" alt="Logo" width={64} height={64} />
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
    </div>
  );
};

export default Navbar;
