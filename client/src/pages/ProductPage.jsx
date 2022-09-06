import React from 'react';
import { Sidebar, Navbar, CardTable, Header } from '../components';

const ProductPage = () => (
  <>
    <Sidebar />
    <div className="relative md:ml-64 bg-slate-100">
      <Navbar />
      <Header />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <CardTable />
      </div>
    </div>
  </>
);

export default ProductPage;
