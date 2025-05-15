function ReportCard({
    totalTransactions,
    totalSent,
    totalReceived,
    startDate,
    endDate,
  }) {

    // Calculate the balance to determine card background color
    const balance = totalReceived - totalSent;
    const getCardStyle = () => {
      if (balance > 0) {
        return "bg-[#99C44510] border-2 border-[#99C445]"; // Positive balance - green theme
      } else if (balance < 0) {
        return "bg-[#ff634710] border-2 border-[#ff6347]"; // Negative balance - red theme
      }
      return "bg-[#5E99CA10] border-2 border-[#5E99CA]"; // Neutral balance - blue theme
    };

    return (
      <div className={`${getCardStyle()} p-4 sm:p-6 rounded-xl shadow-md w-full max-w-md `}>
        
        <div className="flex flex-col sm:flex-row justify-between mb-2 gap-1">
          <span className="text-[#5E99CA] text-sm sm:text-base font-medium">Total Transactions</span>
          <span className="font-semibold text-sm sm:text-base">{totalTransactions}</span>
        </div>
        <hr className="mb-1 border-t border-gray-200" />

        <div className="flex flex-col sm:flex-row justify-between mb-2 gap-1">
          <span className="text-[#5E99CA] text-sm sm:text-base font-medium">Total Sent</span>
          <span className="font-semibold text-sm sm:text-base text-[#ff6347]">-{totalSent} EGP</span>
        </div>
        <hr className="mb-1 border-t border-gray-200" />
  
        <div className="flex flex-col sm:flex-row justify-between mb-2 gap-1">
          <span className="text-[#5E99CA] text-sm sm:text-base font-medium">Total Received</span>
          <span className="font-semibold text-sm sm:text-base text-[#99C445]">+{totalReceived} EGP</span>
        </div>
        <hr className="mb-1 border-t border-gray-200" />
  
        <div className="flex flex-col sm:flex-row justify-between mb-2 gap-1">
          <span className="text-[#5E99CA] text-sm sm:text-base font-medium">Start Date</span>
          <span className="font-semibold text-sm sm:text-base text-gray-700">{startDate}</span>
        </div>
        <hr className="mb-1 border-t border-gray-200" />
  
        <div className="flex flex-col sm:flex-row justify-between gap-1">
          <span className="text-[#5E99CA] text-sm sm:text-base font-medium">End Date</span>
          <span className="font-semibold text-sm sm:text-base text-gray-700">{endDate}</span>
        </div>
        <hr className="mb-1 border-t border-gray-200" />

        {/* Balance Summary */}
        <div className="mt-4 pt-2 border-t-2 border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between gap-1">
            <span className="text-[#5E99CA] text-sm sm:text-base font-medium">Net Balance</span>
            <span className={`font-semibold text-sm sm:text-base ${
              balance > 0 
                ? 'text-[#99C445]' 
                : balance < 0 
                  ? 'text-[#ff6347]' 
                  : 'text-gray-700'
            }`}>
              {balance > 0 ? '+' : ''}{balance} EGP
            </span>
          </div>
        </div>

      </div>
    );
  }
  
  export default ReportCard;
  