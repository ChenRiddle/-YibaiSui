//import { useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
// import menuData from '../data/menu.json';
import './OrderPage.css';

export function OrderPage(){
  return (
    <div className="order-page">
      <Header />
      <div className="order-container">
        <h2>Order Page</h2>
        <p>Test content</p>
      </div>
      <Footer />
    </div>
  );
}