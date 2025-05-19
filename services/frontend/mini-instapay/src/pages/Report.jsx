import Searchfield from "../components/Searchfield"
import Topusername from "../components/Topusername"
import Dateinput from "../components/Dateinput"
import Button from '../components/Button'
import { useEffect, useState } from "react"
import ReportCard from "../components/ReportCard"
import ReportServices from "../services/ReportServices"

import { UserContext } from "../context/UserContext";
import { useContext } from "react";


function Report() {

  const [startsearchdate, setStartsearchdate] = useState("")
  const [endsearchdate, setEndsearchdate] = useState("")
  const [filteredReports, setFilteredReports] = useState([])
  const [isFiltered, setIsFiltered] = useState(false)

  const { user: _ } = useContext(UserContext)

  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchReports = async () => {
    try {
      setLoading(true);
      const reports = await ReportServices.getReports()
      setReports(reports)
      setError(null)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchReports();
    
    // Set up interval to fetch reports every 3 minutes
    const interval = setInterval(() => {
      fetchReports();
    }, 1 * 60 * 1000); // 1 minute in milliseconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [])


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


    const filtered = reports.filter(report => {
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

  


  return (
    <>
      <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-6">
     
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
                  {filterReportsByType(reports, "DAILY").map((report) => (
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

                {filterReportsByType(reports, "DAILY").length === 0 && (
                  <div className="w-full text-center text-gray-500 py-4">
                    {error && <div>Error: {error.message}</div>}
                    {loading && <div>Loading...</div>}
                    {!loading && reports.length === 0 && <div>No reports found</div>}
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
                {filterReportsByType(reports, "WEEKLY").map((report) => (
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
                {filterReportsByType(reports, "WEEKLY").length === 0 && (
                  <div className="w-full text-center text-gray-500 py-4">
                    {error && <div>Error: {error.message}</div>}
                    {loading && <div>Loading...</div>}
                    {!loading && reports.length === 0 && <div>No reports found</div>}
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
