import api from './api';


const login = async (phoneNumber, password) => {
    return api.post('/auth/login', { phoneNumber, password });
}

const register = async (username, phoneNumber, password, pin, cardNumber) => {
    return api.post('/auth/register', { username, phoneNumber, password, pin, cardNumber });
}


export default { login, register };


