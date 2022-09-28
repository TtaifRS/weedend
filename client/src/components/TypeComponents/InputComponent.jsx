import React from 'react';
import Select from '../SelectInput';

const Input = ({ label, defaultValue, handleChange }) => (
  <div className="w-full lg:w-6/12 px-4">
    <div className="relative w-full mb-3">
      <label htmlFor="grid-password" className="block uppercase text-green-600 text-xs font-bold mb-2">
        {label}
      </label>
      <input
        type="text"
        className="border-0 px-2 py-2 placeholder-gray-700 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        defaultValue={defaultValue}
        onChange={handleChange}
      />
    </div>
  </div>
);

const SelectInput = ({ label, value, handleChange, options, selectedOption }) => (
  <div className="w-full lg:w-6/12 px-4">
    <div className="relative flex justify-between items-center w-full mb-3">
      <div className="block uppercase text-green-600 text-xs font-bold mb-2">
        {label}
      </div>
      <div className="block uppercase text-white p-2 bg-green-600 text-xs font-bold mb-2">
        {value}
      </div>
      <div className="block w-1/2 uppercase p-2 text-green-600 text-xs font-bold mb-2">
        <Select
          // className="flex-1"
          options={options}
          selectedOption={selectedOption}
          handelChange={(event) => handleChange(event)}
        />
      </div>
    </div>
  </div>
);

export { SelectInput, Input };
