/* eslint-disable no-unused-vars */
import React from 'react';
import { usePopper } from 'react-popper';
import { useNavigate } from 'react-router-dom';
import { useUserStore, useTokenStore } from '../store';
import Button from './Button';

const UserDropDown = () => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
      placement: 'bottom',
    },
  );
  const user = useUserStore((state) => state.user);
  const fetchLogout = useTokenStore((state) => state.fetchLogout);
  const token = useTokenStore((state) => state.token);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await fetchLogout(token);
    navigate('/login');
  };
  return (
    <>
      <button
        type="button"
        className="block text-green-500"
        ref={referenceElement}
        style={{ ...styles.popper, position: 'relative' }}
        onClick={() => setDropdownPopoverShow(!dropdownPopoverShow)}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="avatar" className="w-full h-full rounded-full align-middle border-none shadow-lg" />
          </span>
        </div>
      </button>
      <div
        ref={setPopperElement}
        style={{ ...styles.popper, top: '65%', left: '-300%' }}
        {...attributes.popper}
        className={`${dropdownPopoverShow ? 'flex flex-col' : 'hidden'} bg-white text-base items-center z-50 float-left py-2 list-none text-left rounded shadow-lg`}
      >
        <p className="text-sm py-2 px-4 font-semibold block w-full whitespace-nowrap bg-transparent text-green-500">
          {user.name}
        </p>
        <p className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-green-500">
          {user.email}
        </p>
        <p className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-green-500">
          {user.role}
        </p>
        <div className="h-0 my-2 border border-solid border-blueGray-100 " />
        <Button btnName="logout" classStyles="w-1/2 text-sm py-2  button-hover border" handleClick={handleLogout} />
      </div>
    </>
  );
};

export default UserDropDown;
