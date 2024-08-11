import React from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggleButton from "./ui/ThemeToggleButton";
import ThrowErrorButton from "./ui/ThrowErrorButton";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="header max-h-[90px] py-[13px] px-[26px] flex justify-between ">
          <Link href="/search/1" prefetch={false}>
            <div className="logo w-[64px] h-[64px]">
              <Image src="/images/logo.png" alt="Logo" width={64} height={64} />
            </div>
          </Link>
          <div className="flex gap-4">
            <ThemeToggleButton />
            <ThrowErrorButton />
            {/* <Search /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
