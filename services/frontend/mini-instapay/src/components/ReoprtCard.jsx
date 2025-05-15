
function ReportCard({
    reportType,
    totalTransactions,
    totalSent,
    totalReceived,
    startDate,
    endDate,
  }) {


    return (
      <div className="bg-[#a8d29f12] p-6 rounded-xl shadow-md  w-full max-w-md hover:scale-103 hover:bg-[#a8d29f2c] transition-transform duration-300 ease-in-out">
        <h2 className="text-[#99C445] text-lg font-semibold mb-2">{reportType} Report</h2>
        <hr className="mb-4" />
  
        <div className="flex justify-between mb-2">
          <span className="text-[#5E99CA] font-medium">Total Transactions</span>
          <span className="font-semibold">{totalTransactions}</span>
        </div>
  
        <div className="flex justify-between mb-2">
          <span className="text-[#5E99CA]  font-medium">Total Sent</span>
          <span className="font-semibold">{totalSent} EGP</span>
        </div>
            
  
        <div className="flex justify-between mb-2">
          <span className="text-[#5E99CA] font-medium">Total Received</span>
          <span className="font-semibold">{totalReceived} EGP</span>
        </div>
  
        <div className="flex justify-between mb-2">
          <span className="text-[#5E99CA]  font-medium">Start Date</span>
          <span className="font-semibold">{startDate}</span>
        </div>
  
        <div className="flex justify-between">
          <span className="text-[#5E99CA]  font-medium">End Date</span>
          <span className="font-semibold">{endDate}</span>
        </div>
      </div>
    );
  }
  
  export default ReportCard;
  