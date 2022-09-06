import React from 'react';

const Button = ({ btnName, classStyles, handleClick }) => (
  <button
    type="button"
    className={`rounded-full bg-lime-300 font-poppins  ${classStyles}`}
    onClick={handleClick}
  >
    {btnName}
  </button>
);

export default Button;
