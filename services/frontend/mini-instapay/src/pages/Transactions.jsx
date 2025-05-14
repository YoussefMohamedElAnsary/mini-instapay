import Sidebar from "../components/Sidebar"
import Topusername from "../components/Topusername"
import Searchfield from "../components/Searchfield"
import Recenttransactions from "../components/Recenttransactions"
import { useEffect, useState } from "react"
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';



function Transactions() {

  

const {transactions} = useContext(TransactionContext)
const [searchvalue , setSearchvalue] = useState("")
const [filteredTransactions, setFilteredTransactions] = useState(transactions)



useEffect(() => {

  console.log(searchvalue)
  if (searchvalue.trim() === "") {
    setFilteredTransactions(transactions); // Show all if input is empty
  } else {
    const filtered = transactions.filter((transaction) => {
      const search = searchvalue.toLowerCase();
      return (
        transaction.description.toLowerCase().includes(search) ||
        transaction.status.toLowerCase().includes(search) ||
        transaction.type.toLowerCase().includes(search)
      );
    });
    setFilteredTransactions(filtered);
  }
}, [searchvalue, transactions]);





  return (
    <>
      
      <div className=" flex flex-col w-11/12  gap-8">

        {/* fe moshkla fe loggic el search zabatha matnsash */}
        <Searchfield  
          value={searchvalue}
          onChange={(e) => setSearchvalue(e.target.value)}
          placeholder={"Search by name, status, or type"}
        />

        <Recenttransactions data={filteredTransactions}/>

      </div>


    </>
  )
}

export default Transactions
