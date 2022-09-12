import React from 'react';
import { Sidebar, Navbar, Header, ProductForm } from '../components';

const ProductUpdatePage = () => (
  <>
    <Sidebar />
    <div className="relative md:ml-64 bg-slate-100">
      <Navbar />
      <Header />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <ProductForm />
      </div>
    </div>
  </>
);

export default ProductUpdatePage;
