import {Link, useLocation} from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string): string => {
    return location.pathname === path ? "underline" : "";
  };
  return (
    <div className="text-white p-3 bg-[#292929] mb-10">
      <ul className="flex gap-10 items-center justify-center">
        <li className={`hover:underline hover:text-white/80 ${isActive("/")}`}>
          <Link to="/">Home</Link>
        </li>
        <li
          className={`hover:underline hover:text-white/80 ${isActive("/controlled")}`}>
          <Link to="/controlled">Controlled form</Link>
        </li>
        <li
          className={`hover:underline hover:text-white/80 ${isActive("/uncontrolled")}`}>
          <Link to="/uncontrolled">Uncontrolled form</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
