import React, { useEffect, useState } from 'react';
import { AiTwotoneCheckCircle, AiTwotoneCloseCircle } from 'react-icons/ai';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import { GrPowerReset } from 'react-icons/gr';
import { Link, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import CsvDownloadButton from 'react-json-to-csv';

import { useProductStore, useTokenStore } from '../store';
import Button from './Button';
import { SelectInput } from './InputComponent';
import '../styles/pagination.css';

const types = [
  {
    id: 1,
    label: '-----TYPES-----',
    value: 'none',
  },
  {
    id: 2,
    label: 'Defaults',
    value: 'Defaults',
  },
  {
    id: 3,
    label: 'Flowers',
    value: 'Flowers',
  },
  {
    id: 4,
    label: 'Pre-Rolls',
    value: 'Pre-Rolls',
  },
  {
    id: 5,
    label: 'Vapable',
    value: 'Vapable',
  },
  {
    id: 6,
    label: 'Concentrates',
    value: 'Concentrates',
  },
  {
    id: 7,
    label: 'Beverages',
    value: 'Beverages',
  },
  {
    id: 8,
    label: 'Edibles',
    value: 'Edibles',
  },
  {
    id: 9,
    label: 'Oils',
    value: 'Oils',
  },
  {
    id: 10,
    label: 'Topicals',
    value: 'Topicals',
  },
  {
    id: 11,
    label: 'Seeds',
    value: 'Seeds',
  },
  {
    id: 12,
    label: 'Producers',
    value: 'Producers',
  },
];

const updateFilter = [
  {
    id: 1,
    label: '-----STATUS-----',
    value: 'none',
  },
  {
    id: 2,
    label: 'Updated',
    value: true,
  },
  {
    id: 3,
    label: 'Not Updated',
    value: false,
  },
];

const limitFilter = [
  {
    id: 1,
    label: 'Default',
    value: 'none',
  },
  {
    id: 2,
    label: '5',
    value: '5',
  },
  {
    id: 3,
    label: '2',
    value: '2',
  },
  {
    id: 4,
    label: '1',
    value: '1',
  },
  {
    id: 5,
    label: '50',
    value: '50',
  },
  {
    id: 6,
    label: '100',
    value: '100',
  },
];

const CardTable = () => {
  const navigate = useNavigate();
  const fetchProduct = useProductStore((state) => state.fetchProducts);
  const fetchProductsLength = useProductStore((state) => state.fetchProductsLength);
  const token = useTokenStore((state) => state.token);
  const products = useProductStore((state) => state.products);
  const length = useProductStore((state) => state.length);

  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  const [sort, setSort] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const typesValue = types.find((el) => el.value);
  const updateValue = updateFilter.find((el) => el.value);
  const limitValue = limitFilter.find((el) => el.value);

  const [type, setType] = useState(typesValue);
  const [currentUpdateFilter, setCurrentUpdateFilter] = useState(updateValue);
  const [currentLimit, setCurrentLimit] = useState(limitValue);

  const itemsPerPage = currentLimit.value === 'none' ? 10 : parseInt(currentLimit.value, 10);
  const pageCount = Math.ceil(length / itemsPerPage);

  useEffect(() => {
    if (pageNumber > pageCount) {
      setPageNumber(null);
    }

    const fetch = async () => {
      await fetchProduct(token, type, currentUpdateFilter, sort, currentLimit, pageNumber);
    };
    fetch();
  }, [fetchProduct, sort, type, currentUpdateFilter, currentLimit, pageNumber]);

  useEffect(() => {
    const fetch = async () => {
      await fetchProductsLength(token, type, currentUpdateFilter, sort);
    };
    fetch();
  }, [fetchProduct, sort, type, currentUpdateFilter]);

  const handleSort = (el) => {
    if (!sort.includes(el) && !sort.includes(`-${el}`)) {
      setSort([el]);
    }
    if (sort.includes(el)) {
      setSort([`-${el}`]);
    }
    if (sort.includes(`-${el}`)) {
      setSort([]);
    }

    return sort;
  };
  const handleClick = async () => {
    toast('⌛ pending', { hideProgressBar: true });
    const reqData = await axios({
      method: 'post',
      url: '/products/new',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (reqData.error) {
      console.log(reqData.error);
      toast.error('Something went wrong');
    }

    navigate(0);
    toast.success('Update Successfull');
    console.log(reqData);
  };

  const handleResetClick = () => {
    setType({
      id: 1,
      label: '-----TYPES-----',
      value: 'none',
    });

    setCurrentUpdateFilter({
      id: 1,
      label: '-----STATUS-----',
      value: 'none',
    });
    setCurrentLimit({
      id: 1,
      label: 'Default',
      value: 'none',
    });

    setSort([]);
    setPageNumber(null);
  };

  const a = currentLimit.value !== 'none' ? currentLimit.value : 10;
  const b = pageNumber || 1;
  const lastLimit = a * b;
  const firstLimit = (a * b) - (a - 1);
  console.log(lastLimit, 'last');
  console.log(firstLimit, 'first');

  if (loading) {
    return (
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg">
        <div className="block w-full overflow-x-auto">
          <ClipLoader color="#86EFAC" />
        </div>

      </div>
    );
  }
  if (error) {
    return (
      <div> Error </div>
    );
  }
  if (!loading) {
    return (
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-col ">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h2 className="font-semibold text-lg text-white">
                  All Products
                </h2>
              </div>
              <div className="flex flex-col justify-center items-end">
                <div className="my-2">
                  <Button handleClick={handleClick} btnName="Check for new products" classStyles="text-black active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" />
                  <ToastContainer />
                </div>
                <div className="my-1 p-2 text-white font-bold bg-green-400">
                  <CsvDownloadButton
                    data={products}
                    filename="weedend-data.csv"
                  >
                    Download as CSV
                  </CsvDownloadButton>
                </div>
              </div>
            </div>
            <div className="flex my-2 h-full  p-4 bg-white">
              <div className="flex flex-col  w-1/2">
                <div className="text-black font-semibold">
                  Filtered By
                </div>
                <div className="flex flex-col w-full">
                  <div className="w-full">
                    <SelectInput
                      label="Types"
                      value={type.value ? type.value : 'None'}
                      options={types}
                      styles="hidden"
                      selectedOption={type}
                      handleChange={(event) => {
                        setType(event);
                      }}
                    />
                  </div>
                  <div>
                    <SelectInput
                      label="Updated"
                      value={currentUpdateFilter.value === 'none' ? 'none' : currentUpdateFilter.value ? 'updated' : 'not updated'}
                      options={updateFilter}
                      styles="hidden"
                      selectedOption={currentUpdateFilter}
                      handleChange={(event) => {
                        setCurrentUpdateFilter(event);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/2 h-auto flex flex-col  justify-end  items-end">
                <div className="w-4/6 flex flex-col  p-4">
                  <div>
                    <SelectInput
                      label="Limit"
                      value={currentLimit.value === 'none' ? 'Default' : currentLimit.value}
                      options={limitFilter}
                      styles="hidden"
                      selectedOption={currentLimit}
                      handleChange={(event) => {
                        setCurrentLimit(event);
                      }}
                    />
                  </div>
                  <div className="mr-3 flex flex-col justify-end items-end">
                    <div className="font-bold text-sm">
                      {`${firstLimit} - ${lastLimit}`}  of over {`${length}`} products
                    </div>
                    <div className="mt-2">
                      <button type="submit" className="flex items-center justify-center p-2 border-2 hover:bg-green-400" onClick={handleResetClick}>
                        <div className="mr-1">
                          reset all filter
                        </div>
                        <div>
                          <GrPowerReset />
                        </div>

                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 whitespace-nowrap font-semibold text-left bg-blue-50 border-blue-100 text-green-400">
                  <button type="submit" className="w-full" onClick={() => handleSort('name')}>
                    <div className="flex justify-between p-2 w-full bg-slate-500">
                      <div>
                        Name
                      </div>
                      <div className="flex justify-around">
                        <div className={`${sort.includes('name') ? 'text-green-700' : 'text-white'}`}>
                          <BsArrowUp />
                        </div>
                        <div className={`${sort.includes('-name') ? 'text-green-700' : 'text-white'}`}>
                          <BsArrowDown />
                        </div>
                      </div>
                    </div>
                  </button>
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 whitespace-nowrap font-semibold text-left bg-blue-50 border-blue-100 text-green-400">
                  <button type="submit" className="w-full" onClick={() => handleSort('categoryName')}>
                    <div className="flex justify-between p-2 w-full bg-slate-500">
                      <div>
                        Category
                      </div>
                      <div className="flex justify-around">
                        <div className={`${sort.includes('categoryName') ? 'text-green-700' : 'text-white'}`}>
                          <BsArrowUp />
                        </div>
                        <div className={`${sort.includes('-categoryName') ? 'text-green-700' : 'text-white'}`}>
                          <BsArrowDown />
                        </div>
                      </div>
                    </div>
                  </button>
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 whitespace-nowrap font-semibold text-left bg-blue-50 border-blue-100 text-green-400">
                  <button type="submit" className="w-full" onClick={() => handleSort('types')}>
                    <div className="flex justify-between p-2 w-full bg-slate-500">
                      <div>
                        Type
                      </div>
                      <div className="flex justify-around">
                        <div className={`${sort.includes('types') ? 'text-green-700' : 'text-white'}`}>
                          <BsArrowUp />
                        </div>
                        <div className={`${sort.includes('-types') ? 'text-green-700' : 'text-white'}`}>
                          <BsArrowDown />
                        </div>
                      </div>
                    </div>
                  </button>
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 whitespace-nowrap font-semibold text-left bg-blue-50 border-blue-100 text-green-400">
                  <button type="submit" className="w-full" onClick={() => handleSort('price')}>
                    <div className="flex justify-between p-2 w-full bg-slate-500">
                      <div>
                        Price
                      </div>
                      <div className="flex justify-around">
                        <div className={`${sort.includes('price') ? 'text-green-700' : 'text-white'}`}>
                          <BsArrowUp />
                        </div>
                        <div className={`${sort.includes('-price') ? 'text-green-700' : 'text-white'}`}>
                          <BsArrowDown />
                        </div>
                      </div>
                    </div>
                  </button>
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 whitespace-nowrap font-semibold text-left bg-blue-50 border-blue-100 text-green-400">
                  <button type="submit" className="w-full" onClick={() => handleSort('updated')}>
                    <div className="flex justify-between p-2 w-full bg-slate-500">
                      <div>
                        Status
                      </div>
                      <div className="flex justify-around">
                        <div className={`${sort.includes('updated') ? 'text-green-700' : 'text-white'}`}>
                          <BsArrowUp />
                        </div>
                        <div className={`${sort.includes('-updated') ? 'text-green-700' : 'text-white'}`}>
                          <BsArrowDown />
                        </div>
                      </div>
                    </div>
                  </button>
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 whitespace-nowrap font-semibold text-left bg-blue-50 border-blue-100 text-green-400">
                  <button type="submit" className="w-full" onClick={() => handleSort('createdAt')}>
                    <div className="flex justify-between p-2 w-full bg-slate-500">
                      <div>
                        Created On
                      </div>
                      <div className="flex justify-around">
                        <div className={`${sort.includes('createdAt') ? 'text-green-700' : 'text-white'}`}>
                          <BsArrowUp />
                        </div>
                        <div className={`${sort.includes('-createdAt') ? 'text-green-700' : 'text-white'}`}>
                          <BsArrowDown />
                        </div>
                      </div>
                    </div>
                  </button>
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 whitespace-nowrap font-semibold text-left bg-blue-50 border-blue-100 text-green-400">
                  Updated On
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 whitespace-nowrap font-semibold text-left bg-blue-50 border-blue-100 text-green-400">
                  Update
                </th>
              </tr>
            </thead>
            <tbody>
              {
                products.map((product) => (
                  <tr key={product.prdocutId}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <p className="ml-3 font-bold text-gray-800">
                        {product.name}
                      </p>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {product.categoryName}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {product.types}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {product.price}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {product.updated
                        ? (
                          <div className="flex items-center text-green-400">
                            <AiTwotoneCheckCircle className="mr-2" />
                            Updated
                          </div>
                        )
                        : (
                          <div className="flex items-center text-red-600">
                            <AiTwotoneCloseCircle className="mr-2" />
                            Not Updated
                          </div>
                        )}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {new Date(product.createdAt).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        },
                      ) }
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {product.updated ? (
                        new Date(product.updatedAt).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          },
                        )
                      ) : '-'}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <Link to={`/product/${product._id}`}>
                        <Button btnName={product.updated ? 'Edit ' : 'Update'} classStyles={product.updated ? 'px-2 py-1 uppercase w-full' : 'px-2 py-1 bg-green-500 uppercase text-white w-full'} />
                      </Link>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="flex w-full justify-center">
          <ReactPaginate
            previousLabel="prev"
            nextLabel="next"
            breakLabel="..."
            breakClassName="break-me"
            onPageChange={(i) => setPageNumber(i.selected + 1)}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        </div>
      </div>
    );
  }
};

export default CardTable;
