import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Header, Loader, Navbar, ProducerTable, Sidebar } from '../components';
import { useProducerStore } from '../store';

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
const Producerpage = () => {
  const fetchProducers = useProducerStore((state) => state.fetchProducers);
  const loading = useProducerStore((state) => state.loading);
  const error = useProducerStore((state) => state.error);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState({});
  const [click, setClick] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      await fetchProducers();
    };
    fetch();
  }, [click]);

  const handleNewProducer = async () => {
    try {
      const nProducer = await axiosInstance({
        method: 'post',
        url: '/create/producer',
        data: name,
      });

      if (nProducer.data.success) {
        toast.success('producer added');
        setClick(!click);
      }
    } catch (err) {
      toast.error('Producer already exist');
    }
  };

  if (loading) {
    return (
      <>
        <Sidebar />
        <div className="relative md:ml-64 bg-slate-100">
          <Header />
          <Navbar />
          <Loader />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Sidebar />
        <div className="relative md:ml-64 bg-slate-100">
          <Header />
          <Navbar />
          <Loader />

        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-slate-100 overflow-hidden">
        <Header />
        <Navbar />
        <div className="flex flex-col ">
          <div className="flex justify-end m-2">
            <Button btnName="Add New Producer" classStyles="rounded-none bg-green-400 text-black active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" handleClick={() => setShowModal(true)} />
            {showModal ? (
              <>
                <div
                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/* content */}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/* header */}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Add New Producer
                        </h3>

                      </div>
                      {/* body */}
                      <div className="relative p-6 flex-auto">
                        <form>
                          <label htmlFor="grid-password" className="block uppercase text-green-600 text-xs font-bold mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            onChange={(e) => setName({ name: e.target.value })}
                          />
                        </form>
                      </div>
                      {/* footer */}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            setShowModal(false);
                            handleNewProducer();
                          }}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black" />
              </>
            ) : null}
            <ToastContainer />
          </div>
          <div className="mx-4 mb-6">
            <ProducerTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Producerpage;
