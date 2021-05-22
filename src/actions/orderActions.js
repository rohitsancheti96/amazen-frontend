import axios from 'axios';
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILURE,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAILURE,
} from '../constants/orderContasts';

const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
        const {
            userSignin: { userInfo },
        } = getState();
        const {
            data: { data: newOrder },
        } = await axios.post('/api/orders', order, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token,
            },
        });
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
    } catch (err) {
        dispatch({ type: ORDER_CREATE_FAILURE, payload: err.message });
    }
};

const detailsOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
        const {
            userSignin: { userInfo },
        } = getState();
        const { data } = await axios.get('/api/orders/' + orderId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token,
            },
        });
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: ORDER_DETAILS_FAILURE, payload: err.message });
    }
};

export { createOrder, detailsOrder };
