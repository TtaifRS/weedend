import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Navbar, Header, Dashboard, Loader } from '../components';
import Sidebar from '../components/Sidebar';
import { useTokenStore, useUserStore } from '../store';

const HomePage = () => {
  const token = useTokenStore((state) => state.token);

  const loading = useUserStore((state) => state.loading);
  const error = useUserStore((state) => state.error);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const userError = useUserStore((state) => state.error);
  useEffect(() => {
    const fetch = async () => {
      await fetchUser(token);
    };
    if (token && token.length !== 0) {
      fetch();
    }
  }, [token]);

  if (token === null) {
    return (
      <Navigate to="/login" />
    );
  }
  if (token.length === 0) {
    return (
      <Navigate to="/login" />
    );
  }

  if (loading) {
    return (
      <div><Loader /></div>
    );
  }

  if (userError || error) {
    return (
      <Navigate to="/login" />
    );
  }

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-slate-100">
        <Navbar />
        <Header />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Dashboard />
        </div>
      </div>
    </>
  );
};

export default HomePage;
