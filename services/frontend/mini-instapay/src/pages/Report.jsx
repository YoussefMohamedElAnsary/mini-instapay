import Searchfield from "../components/Searchfield"
import Topusername from "../components/Topusername"
import Dateinput from "../components/Dateinput"
import Button from '../components/Button'
import { useState } from "react"
import ReportCard from "../components/ReoprtCard"

import { UserContext } from "../context/UserContext";
import { useContext } from "react";


function Report() {

  const [startsearchdate, setStartsearchdate] = useState("")
  const [endsearchdate, setEndsearchdate] = useState("")
  const [filteredReports, setFilteredReports] = useState([])
  const [isFiltered, setIsFiltered] = useState(false)

  const { user: _ } = useContext(UserContext)

  const searchbydate = () => {
    if (!startsearchdate || !endsearchdate) {
      alert("Please select both start and end dates")
      return
    }

    const startDate = new Date(startsearchdate)
    const endDate = new Date(endsearchdate)

    if (startDate > endDate) {
      alert("Start date cannot be after end date")
      return
    }

    const filtered = dummyReports.filter(report => {
      const reportStartDate = new Date(report.startDate.split('-').reverse().join('-'))
      const reportEndDate = new Date(report.endDate.split('-').reverse().join('-'))
      
      return reportStartDate >= startDate && reportEndDate <= endDate
    })

    setFilteredReports(filtered)
    setIsFiltered(true)
  }

  const resetFilter = () => {
    setFilteredReports([])
    setIsFiltered(false)
    setStartsearchdate("")
    setEndsearchdate("")
  }

  const filterReportsByType = (reports, type) => {
    return (isFiltered ? filteredReports : reports).filter(report => report.reportType === type);
  };

  const dummyReports = [
    {
      id: "1",
      userId: "user-1",
      reportType: "DAILY",
      startDate: "05-May-2025",
      endDate: "05-May-2025",
      totalTransactions: 15,
      totalSent: 150,
      totalReceived: 150,
      generatedAt: "05-May-2025"
    },
    {
      id: "2",
      userId: "user-1",
      reportType: "DAILY",
      startDate: "04-May-2025",
      endDate: "04-May-2025",
      totalTransactions: 12,
      totalSent: 180.50,
      totalReceived: 1000,
      generatedAt: "04-May-2025"
    },
    {
      id: "3",
      userId: "user-1",
      reportType: "DAILY",
      startDate: "01-Apr-2025",
      endDate: "30-Apr-2025",
      totalTransactions: 120,
      totalSent: 1500.00,
      totalReceived: 500.00,
      generatedAt: "30-Apr-2025"
    },
    {
      id: "4",
      userId: "user-2",
      reportType: "DAILY",
      startDate: "01-Mar-2025",
      endDate: "31-Mar-2025",
      totalTransactions: 85,
      totalSent: 2200.50,
      totalReceived: 700.25,
      generatedAt: "31-Mar-2025"
    },
    {
      id: "5",
      userId: "user-3",
      reportType: "WEEKLY",
      startDate: "01-Feb-2025",
      endDate: "28-Feb-2025",
      totalTransactions: 98,
      totalSent: 1800.75,
      totalReceived: 900.00,
      generatedAt: "28-Feb-2025"
    },  
    {
      id: "6",
      userId: "user-1",
      reportType: "WEEKLY",
      startDate: "01-May-2025",
      endDate: "07-May-2025",
      totalTransactions: 45,
      totalSent: 600.00,
      totalReceived: 200.00,
      generatedAt: "07-May-2025"
    }
  ];
  


  return (
    <>
      <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Filter Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-x-8 items-end">
          <div className="sm:col-span-1 lg:col-span-2">
            <Dateinput 
              label={"Start Date"} 
              value={startsearchdate} 
              onChange={(e)=>setStartsearchdate(e.target.value)}
            />
          </div>
          <div className="sm:col-span-1 lg:col-span-2">
            <Dateinput 
              label={"End Date"} 
              value={endsearchdate}  
              onChange={(e)=>setEndsearchdate(e.target.value)}
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-2 flex gap-2 flex-row sm:justify-end">
            <Button 
              onClick={searchbydate} 
              className='text-[#F9F7FE] bg-secondary px-4 py-2'
            >
              Apply Filtration   
            </Button>
            {isFiltered && (
              <Button 
                onClick={resetFilter} 
                className='text-[#F9F7FE] bg-primary px-4 py-2'
              >
                Reset Filter
              </Button>
            )}
          </div>
        </div>

        {/* Daily Reports Section */}
        <div className="">
          <h2 className="text-lg sm:text-xl font-semibold text-[#99C445] mb-4 px-2">Daily Reports</h2>
          <div className="relative w-full">
            <div className="flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              <div className="flex gap-4 px-2">
                {filterReportsByType(dummyReports, "DAILY").map((report) => (
                  <div key={report.id} className="snap-center shrink-0">
                    <div className="w-[280px] sm:w-[320px] md:w-[350px]">
                      <ReportCard
                        totalTransactions={report.totalTransactions}
                        totalSent={report.totalSent}
                        totalReceived={report.totalReceived}
                        startDate={report.startDate}
                        endDate={report.endDate}
                      />
                    </div>
                  </div>
                ))}
                {filterReportsByType(dummyReports, "DAILY").length === 0 && (
                  <div className="w-full text-center text-gray-500 py-4">
                    No daily reports available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Reports Section */}
        <div className="">
          <h2 className="text-lg sm:text-xl font-semibold text-[#99C445] mb-4 px-2">Weekly Reports</h2>
          <div className="relative w-full">
            <div className="flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              <div className="flex gap-4 px-2">
                {filterReportsByType(dummyReports, "WEEKLY").map((report) => (
                  <div key={report.id} className="snap-center shrink-0">
                    <div className="w-[280px] sm:w-[320px] md:w-[350px]">
                      <ReportCard
                        totalTransactions={report.totalTransactions}
                        totalSent={report.totalSent}
                        totalReceived={report.totalReceived}
                        startDate={report.startDate}
                        endDate={report.endDate}
                      />
                    </div>
                  </div>
                ))}
                {filterReportsByType(dummyReports, "WEEKLY").length === 0 && (
                  <div className="w-full text-center text-gray-500 py-4">
                    No weekly reports available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Report
