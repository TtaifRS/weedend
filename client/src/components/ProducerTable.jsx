
import React from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { RiEditCircleFill } from 'react-icons/ri';

import { Link } from 'react-router-dom';
import { useProducerStore } from '../store';
import Loader from './Loader';

const tableHead = [
  {
    id: 1,
    label: '#',
  },
  {
    id: 2,
    label: 'Name',
  },
  {
    id: 3,
    label: 'Flowers',
  },
  {
    id: 4,
    label: 'Pre-Rolls',
  },
  {
    id: 5,
    label: 'Edibles',
  },
  {
    id: 6,
    label: 'Beverages',
  },
  {
    id: 7,
    label: 'Soft-Gels',
  },
  {
    id: 8,
    label: 'Oils',
  },
  {
    id: 9,
    label: 'Concentrates',
  },
  {
    id: 10,
    label: 'Vapables',
  },
  {
    id: 11,
    label: 'Topicals',
  },
  {
    id: 12,
    label: 'Organic',
  },
  {
    id: 13,
    label: 'Micro',
  },
  {
    id: 14,
    label: 'Hand-Trimmed',
  },
  {
    id: 15,
    label: 'Hang-Dried',
  },
  {
    id: 16,
    label: 'Actions',
  },

];

const ProducerTable = () => {
  const producers = useProducerStore((state) => state.producers);
  const loading = useProducerStore((state) => state.loading);

  if (loading) {
    return (
      <Loader />
    );
  }
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  {
                  tableHead.map((head) => (
                    <th scope="col" key={head.id} className="text-sm border-r font-medium text-gray-900 px-3 py-4 text-left">
                      {head.label}
                    </th>

                  ))
                }
                </tr>
              </thead>
              <tbody>
                {
                  producers.map((producer, i) => (
                    <tr key={producer._id} className="bg-slate-600  border-b transition duration-300 ease-in-out hover:bg-black">
                      <td className="px-3  border-r py-4 whitespace-nowrap text-sm font-medium text-white">{i + 1}</td>
                      <td className="px-3  border-r py-4 whitespace-nowrap text-sm font-medium text-white">
                        {producer.producerName}
                      </td>
                      <td className="px-3  border-r py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {producer.flowers ? <AiOutlineCheckCircle size={16} color="#00FF66" /> : <AiOutlineCloseCircle size={16} color="#ff0066" />}
                      </td>
                      <td className="px-3  border-r py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {producer.preRolls ? <AiOutlineCheckCircle size={16} color="#00FF66" /> : <AiOutlineCloseCircle size={16} color="#ff0066" />}
                      </td>
                      <td className="px-3  border-r py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {producer.edibles ? <AiOutlineCheckCircle size={16} color="#00FF66" /> : <AiOutlineCloseCircle size={16} color="#ff0066" />}
                      </td>
                      <td className="px-3  border-r py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {producer.beverages ? <AiOutlineCheckCircle size={16} color="#00FF66" /> : <AiOutlineCloseCircle size={16} color="#ff0066" />}
                      </td>
                      <td className="px-3  border-r py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {producer.softGels ? <AiOutlineCheckCircle size={16} color="#00FF66" /> : <AiOutlineCloseCircle size={16} color="#ff0066" />}
                      </td>
                      <td className="px-3  border-r py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {producer.oils ? <AiOutlineCheckCircle size={16} color="#00FF66" /> : <AiOutlineCloseCircle size={16} color="#ff0066" />}
                      </td>
                      <td className="px-3  border-r py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {producer.looseConcentrates ? <AiOutlineCheckCircle size={16} color="#00FF66" /> : <AiOutlineCloseCircle size={16} color="#ff0066" />}
                      </td>
                      <td className="px-3  border-r py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {producer.vapables ? <AiOutlineCheckCircle size={16} color="#00FF66" /> : <AiOutlineCloseCircle size={16} color="#ff0066" />}
                      </td>
                      <td className="px-3  border-r py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {producer.topicals ? <AiOutlineCheckCircle size={16} color="#00FF66" /> : <AiOutlineCloseCircle size={16} color="#ff0066" />}
                      </td>
                      <td className="px-3  border-r py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {producer.organic ? <AiOutlineCheckCircle size={16} color="#00FF66" /> : <AiOutlineCloseCircle size={16} color="#ff0066" />}
                      </td>
                      <td className="px-3  border-r py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {producer.micro ? <AiOutlineCheckCircle size={16} color="#00FF66" /> : <AiOutlineCloseCircle size={16} color="#ff0066" />}
                      </td>
                      <td className="px-3  border-r py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {producer.handTrimmed ? <AiOutlineCheckCircle size={16} color="#00FF66" /> : <AiOutlineCloseCircle size={16} color="#ff0066" />}
                      </td>
                      <td className="px-3 border-r py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {producer.hangDried ? <AiOutlineCheckCircle size={16} color="#00FF66" /> : <AiOutlineCloseCircle size={16} color="#ff0066" />}
                      </td>
                      <td className=" border-r py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex justify-between items-center">

                          <Link to={`/producer/${producer._id}`}>
                            <button type="submit" className="flex px-2 py-1 text-blue-400 flex-col justify-center items-center"><RiEditCircleFill /> Edit </button>
                          </Link>

                        </div>

                      </td>

                    </tr>

                  ))
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducerTable;
