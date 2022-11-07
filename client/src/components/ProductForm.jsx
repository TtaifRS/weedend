import axios from 'axios';
import React, { useEffect, useState } from 'react';
import dot from 'dot-object';
// eslint-disable-next-line no-unused-vars
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetSingleProduct, useTokenStore, useGetWeedEndData, useFieldStore } from '../store';
import { types } from '../data/datatable';
import Button from './Button';
import Loader from './Loader';
import Select from './SelectInput';
import { Beverages, Concentrates, Flowers, PreRolls, Vapables } from './TypeComponents';

const priceDecimal = (str) => {
  const len = str.length;
  const x = `${str.substring(0, len - 2)}.${str.substring(len - 2)}`;
  return x;
};

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // store state
  const product = useGetSingleProduct((state) => state.product);
  const loading = useGetSingleProduct((state) => state.loading);
  const fetchProduct = useGetSingleProduct((state) => state.fetchProduct);
  const token = useTokenStore((state) => state.token);
  const weedEndData = useGetWeedEndData((state) => state.weedEndData);
  const fetchFields = useFieldStore((state) => state.fetchFields);

  const typeValue = types.find((type) => type.value);

  // react state
  // eslint-disable-next-line no-unused-vars
  const [currentTypeValue, setCurrentTypeValue] = useState(typeValue);
  const [addKey, setAddKey] = useState([]);
  const [addValue, setAddValue] = useState([]);
  const [inputValue, setInputValue] = useState({
    updated: true,
  });
  const [extraData, setExtraData] = useState([{
    key: '',
    value: '',
  }]);
  const [extraField, setExtraField] = useState({});
  // fetcing product to show value
  useEffect(() => {
    const fetch = async () => {
      await fetchProduct(token, id);
      await fetchFields();
    };
    fetch();
  }, []);

  // handle extra key input
  const handleExtraInputChange = (index, event) => {
    const values = [...extraData];
    if (event.target.name === 'key') {
      let keyValue = event.target.value;
      keyValue = keyValue.replace(/ +/g, '');
      values[index].key = keyValue;
    } else {
      values[index].value = event.target.value;
    }

    setExtraData(values);
  };

  const handleAddFields = () => {
    const values = [...extraData];
    values.push({ key: '', value: '' });
    setExtraData(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...extraData];
    values.splice(index, 1);
    setExtraData(values);
  };

  const handleExtraField = () => {
    const e = {};
    extraData.forEach((item) => {
      if (item.key.length > 0 && item.value.length > 0) {
        e[item.key] = item.value;
        setExtraField(e);
        setInputValue({
          updated: true,
        });
        toast.success('Additional data added, please click update now');
      } else {
        toast.error('Blank fields');
      }
    });
  };

  // handle input form value
  const handleChange = (key, value) => {
    setInputValue({
      ...inputValue,
      updated: true,
      [key]: value,
    });
  };

  // handle additional input form value
  const addHandleChange = (key, value) => {
    setInputValue({
      ...inputValue,
      updated: true,
    });
    setAddKey([...addKey, key]);
    setAddValue([...addValue, value]);
  };

  // existing additional adata
  const existingProductData = {};

  if (addKey.length > 0) {
    // eslint-disable-next-line no-return-assign
    addKey.map((key, i) => existingProductData[key] = addValue[i]);
  }

  // req.body
  let body = {};

  if (Object.keys(extraField).length > 0 && Object.getPrototypeOf(extraField) === Object.prototype && Object.keys(existingProductData).length === 0 && Object.getPrototypeOf(existingProductData) === Object.prototype && Object.keys(weedEndData).length === 0 && Object.getPrototypeOf(weedEndData) === Object.prototype) {
    body = {
      ...inputValue,
      productData: {
        ...extraField,
      },
    };
    console.log('case 1');
  }

  if (Object.keys(extraField).length === 0 && Object.getPrototypeOf(extraField) === Object.prototype && Object.keys(existingProductData).length > 0 && Object.getPrototypeOf(existingProductData) === Object.prototype && Object.keys(weedEndData).length === 0 && Object.getPrototypeOf(weedEndData) === Object.prototype) {
    body = {
      ...inputValue,
      productData: {
        ...existingProductData,
      },
    };
    console.log('case 2');
  }

  if (Object.keys(extraField).length === 0 && Object.getPrototypeOf(extraField) === Object.prototype && Object.keys(existingProductData).length === 0 && Object.getPrototypeOf(existingProductData) === Object.prototype && Object.keys(weedEndData).length > 0 && Object.getPrototypeOf(weedEndData) === Object.prototype) {
    body = {
      ...inputValue,
      weedEndData: {
        ...weedEndData,
      },
    };
    console.log('case 3');
  }

  if (Object.keys(extraField).length > 0 && Object.getPrototypeOf(extraField) === Object.prototype && Object.keys(existingProductData).length > 0 && Object.getPrototypeOf(existingProductData) === Object.prototype && Object.keys(weedEndData).length === 0 && Object.getPrototypeOf(weedEndData) === Object.prototype) {
    body = {
      ...inputValue,
      productData: {
        ...extraField,
        ...existingProductData,
      },
    };
    console.log('case 4');
  }

  if (Object.keys(extraField).length > 0 && Object.getPrototypeOf(extraField) === Object.prototype && Object.keys(existingProductData).length === 0 && Object.getPrototypeOf(existingProductData) === Object.prototype && Object.keys(weedEndData).length > 0 && Object.getPrototypeOf(weedEndData) === Object.prototype) {
    body = {
      ...inputValue,
      weedEndData: {
        ...weedEndData,
      },
      productData: {
        ...extraField,
      },
    };
    console.log('case 5');
  }

  if (Object.keys(extraField).length === 0 && Object.getPrototypeOf(extraField) === Object.prototype && Object.keys(existingProductData).length > 0 && Object.getPrototypeOf(existingProductData) === Object.prototype && Object.keys(weedEndData).length > 0 && Object.getPrototypeOf(weedEndData) === Object.prototype) {
    body = {
      ...inputValue,
      weedEndData: {
        ...weedEndData,
      },
      productData: {
        ...existingProductData,
      },
    };
    console.log('case 6');
  }

  if (Object.keys(extraField).length > 0 && Object.getPrototypeOf(extraField) === Object.prototype && Object.keys(existingProductData).length > 0 && Object.getPrototypeOf(existingProductData) === Object.prototype && Object.keys(weedEndData).length > 0 && Object.getPrototypeOf(weedEndData) === Object.prototype) {
    body = {
      ...inputValue,
      weedEndData: {
        ...weedEndData,
      },
      productData: {
        ...extraField,
        ...existingProductData,
      },
    };
    console.log('case 7');
  }

  if (Object.keys(extraField).length === 0 && Object.getPrototypeOf(extraField) === Object.prototype && Object.keys(existingProductData).length === 0 && Object.getPrototypeOf(existingProductData) === Object.prototype && Object.keys(weedEndData).length === 0 && Object.getPrototypeOf(weedEndData) === Object.prototype) {
    body = {
      ...inputValue,
    };
    console.log('case 8');
  }

  body = dot.dot(body);
  console.log(body);

  // on update

  const handleClick = async () => {
    if (Object.keys(body).length > 1) {
      const reqData = await axios({
        method: 'put',
        url: `/product/${id}`,
        data: body,
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
    } else {
      toast.error('Nothing to update');
    }
  };
  if (!loading && product._id === id) {
    const price = priceDecimal(product.price.toString());
    let data = [];
    data = [
      {
        label: 'Name',
        val: product.name,
        keyName: 'name',
        key: 1,
      },
      {
        label: 'Category',
        val: product.categoryName,
        keyName: 'categoryName',
        key: 2,
      },
      {
        label: 'Parent Category',
        val: product.parentCategoryName,
        keyName: 'parentCategoryName',
        key: 3,
      },
      {
        label: 'Supplier',
        val: product.supplierName,
        keyName: 'supplierName',
        key: 4,
      },
      {
        label: 'Cannabis Weight',
        val: product.cannabisWeight,
        keyName: 'cannabisWeight',
        key: 5,
      },
      {
        label: 'Cannabis Volume',
        val: product.cannabisVolume,
        keyName: 'cannabisVolume',
        key: 6,
      },
      {
        label: 'THC',
        val: product.thc,
        keyName: 'thc',
        key: 7,
      },
      {
        label: 'CBD',
        val: product.cbd,
        keyName: 'cbd',
        key: 8,
      },
      {
        label: 'Price',
        val: price,
        keyName: 'price',
        key: 9,
      },
      {
        label: 'Description',
        val: product.description,
        keyName: 'description',
        key: 10,
      },

    ];

    return (
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-green-100 border-0">
        <div className="rounded-t bg-white mb-0 p-6">
          <div className="flex text-center justify-between">
            <div className="flex flex-col items-start justify-start">
              <p className="text-sm text-black font-bold">Created On :
                <span className="ml-1 text-blue-400">
                  {new Date(product.createdAt).toLocaleDateString(
                    'en-gb',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    },
                  ) }
                </span>
              </p>
              {product.updated ? (
                <p className="text-sm text-black font-bold">Updated On :
                  <span className="ml-1 text-green-400">
                    {new Date(product.updatedAt).toLocaleDateString(
                      'en-gb',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      },
                    )}
                  </span>
                </p>
              ) : null}
            </div>
            <Button handleClick={handleClick} btnName="update" classStyles="text-black active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" />

          </div>
          <ToastContainer />
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <p className="text-sm mt-3 mb-6 font-bold uppercase">
              Product Information
            </p>
            <div className="flex flex-wrap">
              {
                data.map((item) => (
                  <div className="w-full lg:w-6/12 px-4" key={item.key}>
                    <div className="relative w-full mb-3">
                      <label htmlFor="grid-password" className="block uppercase text-green-600 text-xs font-bold mb-2">
                        {item.label}
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={item.val}
                        onChange={(e) => handleChange(item.keyName, e.target.value)}
                      />
                    </div>
                  </div>
                ))
               }

            </div>
            <hr className="mt-6 border-b-1 border-green-300" />
            <p className="text-sm mt-3 mb-6 font-bold uppercase">
              Weedend Information
            </p>
            <div className="flex flex-col flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex justify-between items-center w-full mb-3">
                  <div className="block uppercase text-black-600 text-xs font-bold mb-2">
                    Types
                  </div>
                  <div className="block uppercase text-green-600 text-xs font-bold mb-2">
                    {product.types}
                  </div>
                  <div className="block w-1/2 uppercase text-green-600 text-xs font-bold mb-2">
                    <Select
          // className="flex-1"
                      options={types}
                      selectedOption={currentTypeValue}
                      handelChange={(event) => {
                        setCurrentTypeValue(event);

                        setInputValue({
                          ...inputValue,
                          updated: true,
                          types: event.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>

              {
                (product.types === 'Flowers')
                  ? <Flowers /> : undefined
              }
              {
                (product.types === 'Pre-Rolls')
                  ? <PreRolls /> : undefined
              }
              {
                (product.types === 'Vapable')
                  ? <Vapables /> : undefined
              }
              {
                (product.types === 'Concentrates')
                  ? <Concentrates /> : undefined
              }
              {
                (product.types === 'Beverages')
                  ? <Beverages /> : undefined
              }
            </div>
            {product.productData ? (
              <>
                <hr className="mt-6 border-b-1 border-green-300" />
                <p className="text-sm mt-3 mb-6 font-bold uppercase">
                  Additional Information
                </p>
                <div className="flex flex-wrap">
                  {
                    Object.keys(product.productData)
                      .map((key, i) => (
                        <div className="w-full lg:w-6/12 px-4" key={i}>
                          <div className="relative w-full mb-3 flex">
                            <input
                              type="text"
                              className="border-0 mr-4 bg-green-700 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 text-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              value={key}
                              readOnly
                            />
                            <input
                              type="text"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              defaultValue={product.productData[key]}
                              onChange={(e) => (addHandleChange(key, e.target.value))}
                            />
                          </div>
                        </div>
                      ))
                  }
                </div>
              </>
            ) : null}
            <hr className="mt-6 border-b-1 border-green-300" />
            <p className="text-sm mt-3 mb-6 font-bold uppercase">
              Add Extra Data
            </p>
            <div className="flex flex-wrap">
              {extraData.map((inputField, index) => (
                <div className="w-full flex justify-between  px-4" key={`${inputField}~${index}`}>
                  <div className="relative w-full pr-5 mb-3">
                    <label htmlFor="grid-password" className="block uppercase text-green-600 text-xs font-bold mb-2">
                      Key
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      id="key"
                      name="key"
                      defaultValue={inputField.key}
                      onChange={(e) => handleExtraInputChange(index, e)}
                    />
                  </div>
                  <div className="relative w-full px-5 mb-3">
                    <label htmlFor="grid-password" className="block uppercase text-green-600 text-xs font-bold mb-2">
                      Value
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      id="value"
                      name="value"
                      defaultValue={inputField.value}
                      onChange={(e) => handleExtraInputChange(index, e)}
                    />
                  </div>
                  <div className="relative w-full pl-5 mb-3">
                    <button
                      className="border-2 hover:bg-red-500 hover:text-white border-red-500 px-3 m-1 py-1"
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleRemoveFields(index)}
                    >
                      -
                    </button>
                    <button
                      className="border-2 hover:bg-green-500 hover:text-white border-green-500 px-3 m-1 py-1"
                      type="button"
                      onClick={() => handleAddFields()}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <button type="button" className="text-black active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" onClick={handleExtraField}>
                Submit
              </button>

            </div>

          </form>
        </div>

      </div>
    );
  }
  return <div><Loader /></div>;
};

export default ProductForm;

