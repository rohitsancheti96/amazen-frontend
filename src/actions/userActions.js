import Axios from 'axios';
import Cookie from 'js-cookie';
const {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAILURE,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
} = require('../constants/userConstants');

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post('/api/users/signin', {
            email,
            password,
        });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAILURE, payload: error.messasge });
    }
};

const register = (name, email, password) => async (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: { name, email, password },
    });
    try {
        const { data } = await Axios.post('/api/users/register', {
            name,
            email,
            password,
        });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAILURE, payload: error.messasge });
    }
};

export { signin, register };
