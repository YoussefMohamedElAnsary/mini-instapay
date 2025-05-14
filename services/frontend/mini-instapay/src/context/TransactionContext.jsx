import { createContext, useState, useEffect } from 'react';
import TransactionServices from '../services/TransactionServices';
import { UserContext } from './UserContext';
import { useContext } from 'react';

export const TransactionContext = createContext();



export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const { user } = useContext(UserContext);
    const userid = user.id;
    const token = user.token;

    const fetchTransactions = async () => {
        const response = await TransactionServices.getUserTransactions(userid, token);
        setTransactions(response.data);
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <TransactionContext.Provider value={{ transactions }}>
            {children}
        </TransactionContext.Provider>
    );
};

