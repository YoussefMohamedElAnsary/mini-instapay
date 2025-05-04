import React from 'react'

function  TransactionItem ({ transaction, img }) {
  return (
    <>

    <div className="flex gap-3 items-center p-1 px-2 rounded-xl text-sm md:text-2l md:text-base xl:text-lg hover:bg-[#D2E4FF]">
      <img src={img} alt="img" className="w-12" />

      <div className="flex flex-col">
        <span className="font-bold">{transaction.description}</span>

        <span className="text-[#616161]">
          {new Date(transaction.createdAt).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
        </span>

        <span className="text-[#616161]">{transaction.type}</span>
      </div>

      <span
        className={`ml-auto font-bold whitespace-wrap ${
          transaction.status === 'FAILED' ? 'text-red-700' : 'text-[#6BAB4A]'
        }`}
      >
        {transaction.status}: {transaction.amount.toLocaleString('en-US')} EGP
      </span>
    </div>
      
    </>
  )
}

export default TransactionItem 
