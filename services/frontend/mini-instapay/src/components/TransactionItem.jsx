import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useState, useEffect } from 'react';

function TransactionItem({ transaction, img }) {
  const { user } = useContext(UserContext);
  
  const isSender = user && transaction.senderUserId === user.id;
  
  const amountPrefix = isSender ? '-' : '+';
  const amountColorClass = transaction.status === 'FAILED' 
    ? 'text-red-700' 
    : isSender ? 'text-blue-500' : 'text-[#6BAB4A]';


    const [showDetails, setShowDetails] = useState(false);
    

    useEffect(() => {

      

    }, [showDetails]);
  
  return (
    <>
      <div className=" flex gap-3 items-center py-2 px-4 rounded-xl text-sm md:text-2l md:text-base xl:text-lg hover:bg-blue-200 border-1 border-[#c9daf6] " onClick={() => setShowDetails(!showDetails)}>
        <img src={img} alt="img" className="w-12" />

        <div className="flex flex-col">

          <span className=" font-bold">
            {isSender ? 'Sent' : 'Received'}
          </span>

          {transaction.description && <span className="font-medium"> Description: <span className="font-normal">{transaction.description}</span></span>}
          
          <span className="text-[#616161]">
            {new Date(transaction.createdAt).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </span>

          {showDetails && 
            <span className="text-[#616161] ">
              sender: {transaction.senderUserId} <br />
              receiver: {transaction.receiverUserId}
            </span> }
          
        </div>

        <span
          className={`ml-auto font-bold whitespace-wrap ${amountColorClass}`}
          >
        
          {transaction.status}: {amountPrefix}{transaction.amount.toLocaleString('en-US')} EGP
        
        </span>
      </div>
    </>
  )
}

export default TransactionItem
