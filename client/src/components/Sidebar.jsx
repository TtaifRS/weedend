import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import { AiOutlineClose, AiFillDatabase } from 'react-icons/ai';
import { RiDashboardFill, RiUser2Fill, RiUserAddFill } from 'react-icons/ri';
import { GiChestnutLeaf } from 'react-icons/gi';
import { MdInventory } from 'react-icons/md';
import UserDropDown from './UserDropDown';

const Sidebar = () => {
  // eslint-disable-next-line no-unused-vars
  const [collapseShow, setCollapseShow] = useState('hidden');
  const activeLink = 'text-green-500 hover:text-green-700';
  const inActiveLink = 'text-slate-500 hover:text-slate-600';
  return (
    <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">

        {/* hamburger menu for mobile device */}
        <button
          className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
          type="button"
          onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
        >
          <BiMenu />
        </button>

        {/* Logo or Name */}
        <Link to="/" className="md:block text-left md:pb-2 text-green-300 mr-0 inline-block whitespace-nowrap uppercase text-lg font-bold py-4 px-0">
          Weed End
        </Link>

        {/* userdrop down for mobile device */}
        <ul className="md:hidden items-center flex flex-wrap list-none">
          <li className="inline-block relative">
            <UserDropDown />
          </li>
        </ul>

        {/* sidebar for mobile devices */}
        <div className={`md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded  ${collapseShow}`}>
          <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-green-400">
            <div className="flex flex-wrap">
              <div className="w-6/12">
                <Link to="/" className="md:block text-left md:pb-2 text-green-300 mr-0 inline-block whitespace-nowrap uppercase text-lg font-bold py-4 px-0">
                  Weed End
                </Link>
              </div>
              <div className="flex w-6/12 justify-end">
                <button
                  className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                  type="button"
                  onClick={() => setCollapseShow('hidden')}
                >
                  <AiOutlineClose />
                </button>
              </div>
            </div>
          </div>
          <hr className="my-4 md:min-w-full" />
          <p className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Admin Dashboard
          </p>
          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? `${activeLink} text-xs flex uppercase py-3 font-bold items-center` : `${inActiveLink} text-xs flex uppercase py-3 font-bold items-center`)}
              >
                <RiDashboardFill className="text-sm mr-2" />
                Dashboard
              </NavLink>
            </li>
            <li className="items-center">
              <NavLink end className={({ isActive }) => (isActive ? `${activeLink} text-xs flex uppercase py-3 font-bold items-center` : `${inActiveLink} text-xs flex uppercase py-3 font-bold items-center`)} to="/products">
                <GiChestnutLeaf className="text-sm mr-2" />
                Products
              </NavLink>
            </li>
            <li className="items-center">
              <NavLink end className={({ isActive }) => (isActive ? `${activeLink} text-xs flex uppercase py-3 font-bold items-center` : `${inActiveLink} text-xs flex uppercase py-3 font-bold items-center`)} to="/fields">
                <AiFillDatabase className="text-sm mr-2" />
                Fields
              </NavLink>
            </li>
            <li className="items-center">
              <NavLink end className={({ isActive }) => (isActive ? `${activeLink} text-xs flex uppercase py-3 font-bold items-center` : `${inActiveLink} text-xs flex uppercase py-3 font-bold items-center`)} to="/producers">
                <MdInventory className="text-sm mr-2" />
                Producers
              </NavLink>
            </li>

          </ul>
          <hr className="my-4 md:min-w-full" />
          <p className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            User Section
          </p>
          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <NavLink end className={({ isActive }) => (isActive ? `${activeLink} text-xs flex uppercase py-3 font-bold items-center` : `${inActiveLink} text-xs flex uppercase py-3 font-bold items-center`)} to="/">
                <RiUser2Fill className="text-sm mr-2" />
                Users
              </NavLink>
            </li>
            <li className="items-center">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? `${activeLink} text-xs flex uppercase py-3 font-bold items-center` : `${inActiveLink} text-xs flex uppercase py-3 font-bold items-center`)}
              >
                <RiUserAddFill className="text-sm mr-2" />
                Add User
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
