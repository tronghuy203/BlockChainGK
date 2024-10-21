import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SiteNavbar from '../SiteNavbar/SiteNavbar';
import ProductForm from '../ProductForm/ProductForm';
import ProductList from '../ProductList/ProductList';
import Footer from '../SiteNavbar/Footer';
import Home from '../Home/Home';
import ProductDetail from '../ProductDetail/ProductDetail';
import UserProducts from '../UserProducts/UserProduct';

const Main = ({ items, onSubmit, onInputChange, handleBuyItem, handleDeliverItem, handleSubmitRating, account,relatedItems }) => {
  return (
    <div>
      <SiteNavbar account={account} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addProduct" element={<ProductForm onSubmit={onSubmit} onInputChange={onInputChange} />} />
        <Route path="/productList" element={<ProductList items={items} handleBuyItem={handleBuyItem} handleDeliverItem={handleDeliverItem} handleSubmitRating={handleSubmitRating} account={account} />} />
        <Route path="/productDetail/:id" element={<ProductDetail items={items} handleBuyItem={handleBuyItem} handleDeliverItem={handleDeliverItem} handleSubmitRating={handleSubmitRating} account={account} relatedItems={relatedItems} />} /> 
        <Route
          path="/userProducts"
          element={<UserProducts items={items} account={account} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default Main;
