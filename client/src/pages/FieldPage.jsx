import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TagsInput } from 'react-tag-input-component';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import { RiEditCircleFill } from 'react-icons/ri';
import { ImBackward, ImCross } from 'react-icons/im';
import { MdDelete, MdRestartAlt } from 'react-icons/md';

import { GrUpdate } from 'react-icons/gr';
import { Sidebar, Navbar, Header, Button, Loader } from '../components';
import { useFieldStore } from '../store';

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

const Tags = ({ field }) => {
  const [newData, setNewData] = useState([]);
  const navigate = useNavigate();
  const handleNewData = async (name) => {
    const { data } = await axiosInstance({
      method: 'post',
      url: '/add',
      data: {
        name,
        data: newData,
      },
    });
    if (data.success) {
      navigate(0);
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="text-black w-full">
        <TagsInput
          value={newData}
          onChange={setNewData}
          name={field.name}
          placeHolder="add new data"
        />
        <em>press enter to add new data</em>
      </div>
      <div className="my-2">
        {newData.length
          ? <Button btnName={`add field to ${field.name}`} classStyles=" text-black py-1 px-2 text-sm font-semibold uppercase hover:bg-white hover:text-black" handleClick={() => handleNewData(field.name)} />
          : null}

      </div>
    </div>
  );
};

const FieldPage = () => {
  const fields = useFieldStore((state) => state.fields);
  const fetchFields = useFieldStore((state) => state.fetchFields);
  const loading = useFieldStore((state) => state.loading);
  const navigate = useNavigate();
  const [dataChanged, setDataChanged] = useState(false);
  const [isSelected, setIsSelected] = useState(undefined);
  const [isUpdated, setIsUpdated] = useState(undefined);
  const [isDelete, setIsDelete] = useState(false);
  const [updateData, setUpdateData] = useState('');
  console.log(dataChanged);
  useEffect(() => {
    const fetch = async () => {
      await fetchFields();
    };
    fetch();
  }, [dataChanged]);

  const handleClick = (e) => {
    setIsSelected(e);
    setDataChanged(false);
    setIsDelete(false);
  };

  const handleDelete = async (id, d) => {
    const { data } = await axiosInstance({
      method: 'put',
      url: '/delete/field',
      data: {
        id,
        data: d,
      },
    });
    if (data.success) {
      setDataChanged(true);
    }
  };

  const handleUpdate = async (id, old, eId) => {
    const body = {
      id,
      old,
      data: updateData,
    };

    const { data } = await axiosInstance({
      method: 'put',
      url: '/update/field',
      data: body,
    });
    if (data.success) {
      setIsSelected(undefined);
      setIsUpdated(eId);
    }
  };

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-slate-100">
        <Navbar />
        <Header />
        <div className="px-4 md:px-10 mx-auto flex flex-wrap justify-evenly -m-24">
          {
            fields.map((field) => (
              <div key={field._id} className="relative flex w-1/4 min-w-0 break-words mx-2 p-5 mb-6 shadow-lg bg-green-400">
                <div className="rounded-t mb-0 px-4 py-3 w-full border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-2 max-w-full flex-grow flex-1">
                      <h2 className="font-bold text-lg text-gray-50">
                        <span className="font-normal text-white text-sm">Name:</span> {field.name}
                      </h2>
                      <div className="flex flex-col w-full text-white">
                        {
                          field.tables.map((e) => (
                            <div key={e._id}>
                              <div className="flex justify-between items-center w-full my-2">
                                <div className="w-full">
                                  <input defaultValue={e.label} disabled className={`text-black  ${isUpdated === e._id ? 'bg-blue-400 text-white' : null}`} />
                                  <input
                                    defaultValue={e.label}
                                    className={` ${isSelected === e._id ? 'visible' : 'hidden'} ${isDelete ? 'bg-red-500 text-white' : 'bg-white text-black'}`}
                                    onChange={(el) => setUpdateData(el.target.value)}
                                  />

                                </div>
                                {
                                  isUpdated === e._id ? (
                                    <button type="submit" onClick={() => navigate(0)}>
                                      <p data-tip="RELOAD" data-delay-show="300"><MdRestartAlt color="blue" /></p>
                                      <ReactTooltip place="right" type="success" effect="solid" padding="4px" delayShow={300} />
                                    </button>
                                  )
                                    : null
                                }
                                {
                                  isSelected !== e._id
                                    ? (
                                      <div className={`${isUpdated === e._id ? 'hidden' : 'visible'}`}>
                                        <button
                                          type="submit"
                                          onClick={() => handleClick(e._id)}
                                        >
                                          <RiEditCircleFill />
                                        </button>
                                      </div>
                                    )
                                    : (
                                      <div className="flex flex-col">
                                        <div>
                                          <p data-tip="BACK" data-delay-show="300">
                                            <button
                                              type="submit"
                                              onClick={() => {
                                                setIsSelected(undefined);
                                                setIsDelete(false);
                                              }}
                                            >
                                              <ImBackward color="yellow" />

                                            </button>
                                          </p>
                                          <ReactTooltip place="right" type="error" effect="solid" padding="4px" delayShow={300} />
                                        </div>
                                        <div>
                                          {
                                            !isDelete
                                              ? (
                                                <div>
                                                  <p data-tip="DELETE" data-delay-show="300">
                                                    <button
                                                      type="submit"
                                                      onClick={() => setIsDelete(true)}
                                                    >
                                                      <ImCross color="red" />

                                                    </button>
                                                  </p>
                                                  <ReactTooltip place="right" type="warning" effect="solid" padding="4px" delayShow={300} />
                                                </div>
                                              )
                                              : (
                                                <div>
                                                  <p data-tip="Confirm Delete" data-delay-show="300">
                                                    <button
                                                      type="submit"
                                                      onClick={() => handleDelete(field._id, e.label)}
                                                    >
                                                      <MdDelete color="red" />
                                                    </button>
                                                  </p>
                                                  <ReactTooltip place="right" type="error" effect="solid" padding="4px" delayShow={300} />
                                                </div>
                                              )
                                          }
                                        </div>
                                        <div>
                                          <p data-tip="UPDATE" data-delay-show="300">
                                            <button
                                              type="submit"
                                              onClick={() => handleUpdate(field._id, e.label, e._id)}
                                            >
                                              <GrUpdate color="blue" />
                                            </button>
                                          </p>
                                          <ReactTooltip place="right" type="warning" effect="solid" padding="4px" delayShow={300} />
                                        </div>
                                      </div>
                                    )
                                }

                              </div>
                              <hr />
                            </div>

                          ))
                        }

                      </div>
                      <div className="my-2">
                        <Tags field={field} />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default FieldPage;
