import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, ProductPage, UserPage, ProductUpdatePage } from './pages';

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="products" element={<ProductPage />} />

    <Route path="/users" element={<UserPage />} />
    <Route path="/product/:id" element={<ProductUpdatePage />} />
    <Route path="/login" element={<LoginPage />} />
  </Routes>
);

export default App;
