import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CartScreen(props) {
    const cart = useSelector((state) => state.cart);

    const { cartItems } = cart;

    const productId = props.match.params.id;
    const qty = props.location.search
        ? Number(props.location.search.split('=')[1])
        : 1;
    const dispatch = useDispatch();

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
    };

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, []);

    return (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    {cartItems.length === 0 ? (
                        <div>Cart is empty</div>
                    ) : (
                        cartItems.map((item) => (
                            <li key={item.product_id}>
                                <div className="cart-image">
                                    <Link to={'/products/' + item.product_id}>
                                        <img src={item.image} alt="product" />
                                    </Link>
                                </div>
                                <div className="cart-name">
                                    <div>{item.name}</div>
                                    <div>
                                        Qty:{' '}
                                        <select
                                            value={item.qty}
                                            onChange={(e) =>
                                                dispatch(
                                                    addToCart(
                                                        item.product_id,
                                                        e.target.value
                                                    )
                                                )
                                            }
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                        </select>
                                    </div>
                                    <button
                                        type="button"
                                        className="button"
                                        onClick={() =>
                                            removeFromCartHandler(
                                                item.product_id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div className="cart-price">${item.price}</div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <div className="cart-action">
                <h3>
                    SubTotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
                    : $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <button
                        className="button primary"
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartScreen;
