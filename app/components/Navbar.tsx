import { Link } from '@remix-run/react';
import ThrowErrorButton from './ui/ThrowErrorButton';
import Search from './Search';
import ThemeToggleButton from './ui/ThemeToggleButton';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <header className="max-h-[90px] py-[13px] px-[26px] flex justify-between ">
          <Link to="/search/1" prefetch="intent">
            <div className="logo w-[64px] h-[64px]">
              <img src="/images/logo.png" alt="Logo" width={64} height={64} />
            </div>
          </Link>
          <div className="flex gap-4">
            <ThrowErrorButton />
            <ThemeToggleButton />
            <Search />
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
