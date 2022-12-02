import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useProducerStore } from '../store';
import Loader from './Loader';

const RadioForm = ({ name, handleClickTrue, handleClickFalse }) => (

  <div className="flex-auto bg-slate-500 text-white px-4 lg:px-10 py-2">
    <div className="flex border rounded-full overflow-hidden m-4 select-none">
      <div className="title py-3 my-auto px-5 bg-green-500 text-white text-sm font-semibold mr-3">{name}</div>
      <label className="flex radio p-2 cursor-pointer">
        <input className="my-auto transform scale-125" type="radio" value="true" name={name} onClick={handleClickTrue} />
        <div className="title px-2">True</div>
      </label>

      <label className="flex radio p-2 cursor-pointer">
        <input className="my-auto transform scale-125" type="radio" value="false" name={name} onClick={handleClickFalse} />
        <div className="title px-2">False</div>
      </label>
    </div>
  </div>
);

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

const ProducerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const producer = useProducerStore((state) => state.singleProducer);
  const fetchUpdateProducer = useProducerStore((state) => state.fetchProducerUpdate);
  const fetchSingleProducer = useProducerStore((state) => state.fetchSingleProducer);
  const loading = useProducerStore((state) => state.loading);
  const [data, setData] = useState({});

  const handleUpdate = async () => {
    await fetchUpdateProducer(producer._id, data);
    await fetchSingleProducer(id);
  };

  const handleDelete = async () => {
    const dProducer = await axiosInstance({
      method: 'delete',
      url: `/delete/producer/${id}`,
    });

    if (dProducer.data.success) {
      navigate('/producers');
    }
  };

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-8/12 px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">{producer.producerName}</h6>
              <div className="flex flex-col">
                <button
                  className="bg-lightBlue-500 text-black active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mt-2"
                  type="button"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="flex  justify-between ">
            <RadioForm name="Flowers" handleClickTrue={() => setData({ ...data, flowers: true })} handleClickFalse={() => setData({ ...data, flowers: false })} />
            <RadioForm name="Pre-Rolls" handleClickTrue={() => setData({ ...data, preRolls: true })} handleClickFalse={() => setData({ ...data, preRolls: false })} />
          </div>
          <div className="flex justify-between">
            <RadioForm name="Edibles" handleClickTrue={() => setData({ ...data, edibles: true })} handleClickFalse={() => setData({ ...data, edibles: false })} />
            <RadioForm name="Beverages" handleClickTrue={() => setData({ ...data, beverages: true })} handleClickFalse={() => setData({ ...data, beverages: false })} />
          </div>
          <div className="flex justify-between">
            <RadioForm name="Soft Gels" handleClickTrue={() => setData({ ...data, softGels: true })} handleClickFalse={() => setData({ ...data, softGels: false })} />
            <RadioForm name="Oils" handleClickTrue={() => setData({ ...data, oils: true })} handleClickFalse={() => setData({ ...data, oils: false })} />
          </div>
          <div className="flex justify-between">
            <RadioForm name="Concentrates" handleClickTrue={() => setData({ ...data, looseConcentrates: true })} handleClickFalse={() => setData({ ...data, looseConcentrates: false })} />
            <RadioForm name="Vapables" handleClickTrue={() => setData({ ...data, vapables: true })} handleClickFalse={() => setData({ ...data, vapables: false })} />
          </div>
          <div className="flex justify-between">
            <RadioForm name="Topicals" handleClickTrue={() => setData({ ...data, topicals: true })} handleClickFalse={() => setData({ ...data, topicals: false })} />
            <RadioForm name="Organic" handleClickTrue={() => setData({ ...data, organic: true })} handleClickFalse={() => setData({ ...data, organic: false })} />
          </div>
          <div className="flex justify-between">
            <RadioForm name="Micro" handleClickTrue={() => setData({ ...data, micro: true })} handleClickFalse={() => setData({ ...data, micro: false })} />
            <RadioForm name="Hand-Trimmed" handleClickTrue={() => setData({ ...data, handTrimmed: true })} handleClickFalse={() => setData({ ...data, handTrimmed: false })} />
          </div>
          <div className="flex justify-between">
            <RadioForm name="Hang-Dried" handleClickTrue={() => setData({ ...data, hangDried: true })} handleClickFalse={() => setData({ ...data, hangDried: false })} />
          </div>
          <div className="flex-auto bg-slate-500 text-white px-4 lg:px-10 py-2">
            <div className="flex border rounded-full overflow-hidden m-4 select-none">
              <label htmlFor="grid-password" className="title py-3 my-auto px-5 bg-green-500 text-white text-sm font-semibold ">
                Additional Information
              </label>
              <input
                type="text"
                className="border-0 px-3 text-black bg-slate-500 rounded text-sm shadow focus:outline-none focus:bg-white focus:ring w-full ease-linear transition-all duration-150"
                id="Additional Information"
                name="Additional Information"
                onChange={(e) => setData({ ...data, additionalInfo: e.target.value })}
              />
            </div>

          </div>
        </div>
      </div>
      <div className="w-full lg:w-4/12 px-4">
        <div className="relative flex flex-col   break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
          <div className="p-4 flex justify-center align-middle">
            {producer.producerName}

          </div>
          <ul className=" text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200">
            <li className="py-2 text-center px-4 w-full rounded-t-lg border-b border-gray-200 "> Flowers: {producer.flowers ? (<span className="font-bold text-green-600">True</span>) : (<span className="font-bold text-red-600">False</span>)}</li>

            <li className="py-2 text-center px-4 w-full rounded-t-lg border-b border-gray-200 "> Pre-Rolls: {producer.preRolls ? (<span className="font-bold text-green-600">True</span>) : (<span className="font-bold text-red-600">False</span>)}</li>

            <li className="py-2 text-center px-4 w-full rounded-t-lg border-b border-gray-200 "> Edibles: {producer.edibles ? (<span className="font-bold text-green-600">True</span>) : (<span className="font-bold text-red-600">False</span>)}</li>

            <li className="py-2 text-center px-4 w-full rounded-t-lg border-b border-gray-200 "> Beverages: {producer.beverages ? (<span className="font-bold text-green-600">True</span>) : (<span className="font-bold text-red-600">False</span>)}</li>

            <li className="py-2 text-center px-4 w-full rounded-t-lg border-b border-gray-200 "> Soft Gels: {producer.softGels ? (<span className="font-bold text-green-600">True</span>) : (<span className="font-bold text-red-600">False</span>)}</li>

            <li className="py-2 text-center px-4 w-full rounded-t-lg border-b border-gray-200 "> Oils: {producer.oils ? (<span className="font-bold text-green-600">True</span>) : (<span className="font-bold text-red-600">False</span>)}</li>

            <li className="py-2 text-center px-4 w-full rounded-t-lg border-b border-gray-200 "> Vapables: {producer.vapables ? (<span className="font-bold text-green-600">True</span>) : (<span className="font-bold text-red-600">False</span>)}</li>

            <li className="py-2 text-center px-4 w-full rounded-t-lg border-b border-gray-200 "> Concentrates: {producer.looseConcentrates ? (<span className="font-bold text-green-600">True</span>) : (<span className="font-bold text-red-600">False</span>)}</li>

            <li className="py-2 text-center px-4 w-full rounded-t-lg border-b border-gray-200 "> Topicals: {producer.topicals ? (<span className="font-bold text-green-600">True</span>) : (<span className="font-bold text-red-600">False</span>)}</li>

            <li className="py-2 text-center px-4 w-full rounded-t-lg border-b border-gray-200 "> Organic: {producer.organic ? (<span className="font-bold text-green-600">True</span>) : (<span className="font-bold text-red-600">False</span>)}</li>

            <li className="py-2 text-center px-4 w-full rounded-t-lg border-b border-gray-200 "> Micro: {producer.micro ? (<span className="font-bold text-green-600">True</span>) : (<span className="font-bold text-red-600">False</span>)}</li>

            <li className="py-2 text-center px-4 w-full rounded-t-lg border-b border-gray-200 "> Hand-Trimmed: {producer.handTrimmed ? (<span className="font-bold text-green-600">True</span>) : (<span className="font-bold text-red-600">False</span>)}</li>

            <li className="py-2 text-center px-4 w-full rounded-t-lg border-b border-gray-200 "> Hang-Dried: {producer.hangDried ? (<span className="font-bold text-green-600">True</span>) : (<span className="font-bold text-red-600">False</span>)}</li>

          </ul>
          <div className="py-5 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <h5 className="text-lg font-semibold ">Additional Information</h5>
                <p className="mb-4 ">
                  {producer.additionalInfo ? producer.additionalInfo : 'Nothing to show, please add information'}
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducerForm;
