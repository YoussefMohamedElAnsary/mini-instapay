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

const getUserTransactions = async (userid , token) => {

    const response = await Transactionapi.get( `/transactions/user/${userid}` , 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    console.log('::::::::from transaction service:::::Transactions found for user >>>>>>', userid, response.data);
    return response;

}

export default { sendMoney, cancelTransaction, confirmTransaction ,getUserTransactions};




