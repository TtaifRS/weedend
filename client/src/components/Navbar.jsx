import React from 'react';
import { Link } from 'react-router-dom';
import UserDropDown from './UserDropDown';

const Navbar = () => (
  <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
    <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
      <Link to="/" className="text-sm text-slate-50 uppercase hidden lg:inline-block font-bold">Dashboard</Link>
      <div className="flex-col md:flex-row list-none relative items-center hidden md:flex">
        <UserDropDown />
      </div>
    </div>

  </nav>
);

export default Navbar;
