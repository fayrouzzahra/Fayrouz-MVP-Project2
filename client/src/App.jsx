import React, { useState, useEffect } from 'react';
import {  Link } from 'react-router-dom';
import ProductsList from './component/ProductList';
import Search from './component/Search';
import axios from 'axios';
import ProductDetails from './component/ProductDetails';
import Cart from './component/Cart';
import Login from './component/Login';
import Signup from './component/Signup';
import './App.css'



const App = ({one,setOne}) => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchData = () => {
    axios
      .get('http://localhost:3500/api/product/get')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data'));
  };

  useEffect(() => {
    fetchData();
    fetchCart();
  }, []);

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:3500/api/product/${id}`)
      .then(() => fetchData())
      .catch((err) => console.log(err));
  };

  const addToCart = (obj) => {
    axios
      .post('http://localhost:3500/api/cart/post', obj)
      .then(() => alert('Added to cart'))
      .catch((e) => console.log(e));
  };

  const fetchCart = () => {
    axios('http://localhost:3500/api/cart/get')
      .then((response) => {
        setCart(response.data);
      })
      .catch((e) => console.log(e));
  };

  const deleteCart = (id) => {
    axios
      .delete(`http://localhost:3500/api/cart/${id}`)
      .then(() => console.log('Deleted from cart'))
      .catch((e) => console.log(e));
  }

  return (
    // <Router>
      <div className="App">
        <div className="nav">
          <Link className="logo" to="/">
            Healthy Recipes
          </Link>
          <Search data={data} setData={setData} />
          <Link className="items" to="/cart" style={{ marginRight: 30, marginLeft: 30 }}>
            🛒 CART
          </Link>
        </div>
            <ProductsList addToCart={addToCart} dlt={deleteProduct} data={data} switchView={(option, one) => setOne(one)} />
            {/* <ProductDetails deleteProduct={deleteProduct} addToCart={addToCart} one={one} switchView={(option) => {}} /> */}
      </div>
    // </Router>
  );
};

export default App;
