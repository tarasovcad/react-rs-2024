import {Outlet} from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="max-w-[1400px] mx-auto text-center">
      <Navbar />
      <Outlet />
    </div>
  );
}
