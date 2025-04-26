import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import "./assets/style.css";

function App() {
  return (
    <Router>
      <div>
        <h1>Product Management</h1>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
