import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Navbar, Header, Dashboard } from '../components';
import Sidebar from '../components/Sidebar';
import { useTokenStore, useUserStore } from '../store';

const HomePage = () => {
  const token = useTokenStore((state) => state.token);

  const loading = useUserStore((state) => state.loading);
  const error = useUserStore((state) => state.error);
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    const fetch = async () => {
      await fetchUser(token);
    };
    fetch();
  }, [fetchUser]);

  if (loading) {
    return (
      <div>Loading</div>
    );
  }

  if (!token && error) {
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
