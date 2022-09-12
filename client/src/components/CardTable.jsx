import React, { useEffect } from 'react';
import { AiTwotoneCheckCircle, AiTwotoneCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useProductStore, useTokenStore } from '../store';
import Button from './Button';

const CardTable = () => {
  const fetchProduct = useProductStore((state) => state.fetchProducts);
  const token = useTokenStore((state) => state.token);
  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);

  useEffect(() => {
    const fetch = async () => {
      await fetchProduct(token);
    };
    fetch();
  }, [fetchProduct]);

  if (loading) {
    return (
      <div> loading </div>
    );
  }
  if (error) {
    return (
      <div> Error </div>
    );
  }
  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h2 className="font-semibold text-lg text-white">
              All Products
            </h2>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 whitespace-nowrap font-semibold text-left bg-blue-50 border-blue-100 text-green-400">
                Name
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 whitespace-nowrap font-semibold text-left bg-blue-50 border-blue-100 text-green-400">
                Catergory
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 whitespace-nowrap font-semibold text-left bg-blue-50 border-blue-100 text-green-400">
                Status
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 whitespace-nowrap font-semibold text-left bg-blue-50 border-blue-100 text-green-400">
                Created On
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
                      'en-gb',
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
                        'en-gb',
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
                      <Button btnName="update" classStyles={product.updated ? 'px-2 py-1 uppercase ' : 'px-2 py-1 bg-green-500 uppercase text-white'} />
                    </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardTable;
