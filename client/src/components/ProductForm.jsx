import axios from 'axios';
import React, { useEffect, useState } from 'react';
import dot from 'dot-object';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetSingleProduct, useTokenStore } from '../store';
import Button from './Button';

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

  // react state
  const [addKey, setAddKey] = useState([]);
  const [addValue, setAddValue] = useState([]);
  const [inputValue, setInputValue] = useState({
    updated: false,
  });

  // fetcing product to show value
  useEffect(() => {
    const fetch = async () => {
      await fetchProduct(token, id);
    };
    fetch();
  }, []);

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
    addKey.map((key, i) => (
      existingProductData[key] = addValue[i]
    ));
  }

  // req.body
  let body = {};
  if (
    existingProductData
  && Object.keys(existingProductData).length === 0
  && Object.getPrototypeOf(existingProductData) === Object.prototype
  ) {
    body = {
      ...inputValue,
    };
    body = dot.dot(body);
  } else {
    body = {
      ...inputValue,
      productData: {
        ...existingProductData,
      },
    };
    body = dot.dot(body);
  }

  // on update
  const handleClick = async () => {
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
    }
    console.log('button clicked');
    navigate(0);
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
          </form>
        </div>

      </div>
    );
  }
  return <div>loading</div>;
};

export default ProductForm;

