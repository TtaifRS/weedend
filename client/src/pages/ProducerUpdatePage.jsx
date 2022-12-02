import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Loader, Navbar, ProducerForm, Sidebar } from '../components';
import { useProducerStore } from '../store';

const ProducerUpdatePage = () => {
  const { id } = useParams();
  const fetchSingleProducer = useProducerStore((state) => state.fetchSingleProducer);

  const loading = useProducerStore((state) => state.loading);
  const error = useProducerStore((state) => state.error);
  useEffect(() => {
    const fetch = async () => {
      await fetchSingleProducer(id);
    };
    fetch();
  }, []);

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

          <ProducerForm />
        </div>
      </div>
    </>
  );
};

export default ProducerUpdatePage;
