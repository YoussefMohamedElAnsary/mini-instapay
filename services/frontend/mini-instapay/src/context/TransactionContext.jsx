import { createContext, useState, useEffect } from 'react';
import TransactionServices from '../services/TransactionServices';
import { UserContext } from './UserContext';
import { useContext } from 'react';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { user, token } = useContext(UserContext);

    const fetchTransactions = async () => {
        if (!user || !token) {
            setLoading(false);
            return;
        }
        
        try {
            setLoading(true);
            const response = await TransactionServices.getUserTransactions(user.id, token);
            setTransactions(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching transactions:", err);
            setError("Failed to load transactions");
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && token) {
            fetchTransactions();
        }
    }, [user, token]);

    return ( 
        <TransactionContext.Provider value={{ 
            transactions, 
            loading,
            error,
            fetchTransactions
        }}>
            {children}
        </TransactionContext.Provider>
    );
};

