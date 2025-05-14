import img from "../assets/Group 11.png"
import { Link } from "react-router-dom"
import TransactionItem from "./TransactionItem"

function Recenttransactions( {data , displayLimit} ) {

  return (
   
   <>

   {data.length > 0 ? (
    <div className="relative z-10 rounded-md bg-white shadow-md p-4 flex flex-col gap-2">
        
        <div className="text-[#5E99CA] flex items-center justify-between">
            <h2 className=" font-bold md:text-xl  text-xl ">Recent Transactions</h2>
           {displayLimit && <span className=" font-medium text-lg underline cursor-pointer"> <Link to="/transactions">See All</Link> </span> } 
        </div>

        <div className="flex flex-col gap-1">

        {data.slice(0, displayLimit).map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} img={img} />
        ))}

        </div>

    </div>
    ) : (
      <div className="relative z-10 rounded-md bg-white shadow-md p-4 flex items-center justify-center h-40">
        <h2 className="text-xl font-medium text-gray-500">No transactions found</h2>
      </div>
    )}
    </>
  )


}

export default Recenttransactions
