import api from './api';


const login = async (phoneNumber, password) => {
    return api.post('/auth/login', { phoneNumber, password });
}

const register = async (username, phoneNumber, password, pin, cardNumber) => {
    return api.post('/auth/register', { username, phoneNumber, password, pin, cardNumber });
}

const verifyPin = async (pin, token) => {
    const response = await api.post('/auth/verify-pin', { pin },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
}


export default { login, register, verifyPin };


