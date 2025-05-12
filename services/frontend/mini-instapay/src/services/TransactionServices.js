
import Transactionapi from './Transactionapi';


const getTransactions = async ( phoneNumber , amount , pin , comment, token) => {

    const response = await Transactionapi.post('/transaction', {
       body: {
        phoneNumber,
        amount,
        pin,
        comment,
       },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}       


export default { getTransactions };




