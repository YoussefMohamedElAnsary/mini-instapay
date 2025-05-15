import Sidebar from "../components/Sidebar"
import Topusername from "../components/Topusername"
import Searchfield from "../components/Searchfield"
import Recenttransactions from "../components/Recenttransactions"
import { useEffect, useState } from "react"
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

function Transactions() {
  const { transactions, loading, error, fetchTransactions } = useContext(TransactionContext);
  const [searchvalue, setSearchvalue] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);


  // Filter transactions based on search value
  useEffect(() => {
    if (!Array.isArray(transactions)) {
      setFilteredTransactions([]);
      return;
    }

    if (searchvalue.trim() === "") {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter((transaction) => {
        if (!transaction) return false;
        
        const search = searchvalue.toLowerCase();
        return (
          (transaction.description && transaction.description.toLowerCase().includes(search)) ||
          (transaction.status && transaction.status.toLowerCase().includes(search)) ||
          (transaction.type && transaction.type.toLowerCase().includes(search))
        );
      });
      
      setFilteredTransactions(filtered);
    }
  }, [searchvalue, transactions]);


  return (
    <>
      <div className="flex flex-col w-11/12 gap-8">
        <Searchfield  
          value={searchvalue}
          onChange={(e) => setSearchvalue(e.target.value)}
          placeholder={"Search by name, status, or type"}
        />

        <Recenttransactions 
          data={filteredTransactions} 
          loading={loading}
          error={error}
        />
      </div>
      
    </>
  );
}

export default Transactions;
