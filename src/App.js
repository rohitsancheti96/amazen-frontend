import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/productsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

function App() {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const openMenu = () => {
        document.querySelector('.sidebar').classList.add('open');
    };

    const closeMenu = () => {
        document.querySelector('.sidebar').classList.remove('open');
    };
    return (
        <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>&#9776;</button>
                    <Link to="/">amazen</Link>
                </div>
                <div className="header-links">
                    <Link to="/cart">Cart</Link>
                    {userInfo ? (
                        <Link to="/profile">{userInfo.name}</Link>
                    ) : (
                        <Link to="/signin">Sign In</Link>
                    )}
                </div>
            </header>
            <aside className="sidebar">
                <h3>Shopping Categories</h3>
                <button className="sidebar-close-button" onClick={closeMenu}>
                    x
                </button>
                <ul>
                    <li>
                        <a href="index.html">Pants</a>
                    </li>
                    <li>
                        <a href="index.html">Shirts</a>
                    </li>
                </ul>
            </aside>
            <main className="main">
                <div className="content">
                    <Route path="/products/:id" component={ProductScreen} />
                    <Route path="/products" exact component={ProductsScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/shipping" component={ShippingScreen} />
                    <Route path="/payment" component={PaymentScreen} />
                    <Route path="/placeorder" component={PlaceOrderScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/signin" component={SigninScreen} />
                    <Route path="/order/:id" component={OrderScreen} />
                    <Route path="/" exact={true} component={HomeScreen} />
                </div>
            </main>
            <footer className="footer">All rights reserved.</footer>
        </div>
    );
}

export default App;
