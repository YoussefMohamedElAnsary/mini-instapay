import Transactionapi from './Transactionapi';

const sendMoney = async (senderUserId, receiverPhoneNumber, amount, description, token) => {
    const response = await Transactionapi.post('/transactions', 
        {
            senderUserId,
            receiverPhoneNumber, 
            amount: parseFloat(amount),
            description
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
}      

const cancelTransaction = async (transactionId, token) => {
    const response = await Transactionapi.post(`/transactions/${transactionId}/cancel`, 
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
}

const confirmTransaction = async (transactionId, token) => {
    const response = await Transactionapi.post(`/transactions/${transactionId}/confirm`, 
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
}

export default { sendMoney, cancelTransaction, confirmTransaction };




