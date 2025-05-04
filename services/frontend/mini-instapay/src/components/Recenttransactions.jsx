import img from "../assets/Group 11.png"
import { Link } from "react-router-dom"

function Recenttransactions( {data , displayLimit} ) {




  return (
   
   <>
    <div className="rounded-md bg-white shadow-md p-4 flex flex-col gap-2">
        
        <div className="text-[#99C445] flex items-center justify-between">
            <h2 className=" font-bold md:text-xl  text-xl ">Recent Transactions</h2>
           {displayLimit && <span className=" font-medium text-lg underline cursor-pointer"> <Link to="/transactions">See All</Link> </span> } 
        </div>

        <div className="flex flex-col gap-1">

        {data.slice(0, displayLimit).map((transaction) => (
            <div key={transaction.id} className="flex gap-3 items-center p-1 px-2 rounded-xl text-sm md:text-2l  md:text-base  xl:text-lg hover:bg-[#5e99ca72]">
                <img src={img} alt="img" className="w-12" />
                
                <div className="flex flex-col">
                    <span className="font-bold">{transaction.description}</span>
                    
                    <span className="text-[#616161]">
                        {new Date(transaction.createdAt).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        })}
                    </span>
                    <span className="text-[#616161]">  {transaction.type}</span>
                </div>

                <span className={`  ml-auto font-bold whitespace-wrap ${
                    transaction.status === 'FAILED' ? 'text-red-700' : 'text-green-700'
                }`}>
                    {transaction.status}: {transaction.amount.toLocaleString('en-US')} EGP
                </span>
            </div>
        ))}


        </div>

    </div>
    </>
  )


}

export default Recenttransactions
