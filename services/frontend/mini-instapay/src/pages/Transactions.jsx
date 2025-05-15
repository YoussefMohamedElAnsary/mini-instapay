import Sidebar from "../components/Sidebar"
import Topusername from "../components/Topusername"
import Searchfield from "../components/Searchfield"
import Recenttransactions from "../components/Recenttransactions"
import { useEffect, useState } from "react"
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { useSearchParams } from "react-router-dom"

function Transactions() {
  const { transactions, loading, error, fetchTransactions } = useContext(TransactionContext);
  const { user } = useContext(UserContext);
  const [searchvalue, setSearchvalue] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchParams] = useSearchParams();

  const filteredTransactionType = searchParams.get("type");

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (!Array.isArray(transactions) || !user) {
      setFilteredTransactions([]);
      return;
    }

    let filtered = [...transactions];

    if (filteredTransactionType) {
      filtered = filtered.filter((transaction) => {
        if (filteredTransactionType === "COLLECTED") {
          return transaction.receiverUserId === user.id;
        } else if (filteredTransactionType === "SENT") {
          return transaction.senderUserId === user.id;
        }
        return true;
      });
    }

    // Then apply search filter
    if (searchvalue.trim() !== "") {
      filtered = filtered.filter((transaction) => {
        if (!transaction) return false;
        
        const search = searchvalue.toLowerCase();
        return (
          (transaction.description && transaction.description.toLowerCase().includes(search)) ||
          (transaction.status && transaction.status.toLowerCase().includes(search)) ||
          (transaction.type && transaction.type.toLowerCase().includes(search))
        );
      });
    }

    setFilteredTransactions(filtered);
  }, [searchvalue, transactions, filteredTransactionType, user]);

  return (
    <>
      <div className="flex flex-col w-11/12 gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">
            {filteredTransactionType === "COLLECTED" ? "Received Payments" :
             filteredTransactionType === "SENT" ? "Sent Payments" :
             "All Transactions"}
          </h2>
          <Searchfield  
            value={searchvalue}
            onChange={(e) => setSearchvalue(e.target.value)}
            placeholder={"Search by name, status, or type"}
          />
        </div>

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
