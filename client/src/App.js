import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, ProductPage, UserPage, ProductUpdatePage } from './pages';
import FieldPage from './pages/FieldPage';

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="products" element={<ProductPage />} />
    <Route path="/fields" element={<FieldPage />} />
    <Route path="/users" element={<UserPage />} />
    <Route path="/product/:id" element={<ProductUpdatePage />} />
    <Route path="/login" element={<LoginPage />} />
  </Routes>
);

export default App;
