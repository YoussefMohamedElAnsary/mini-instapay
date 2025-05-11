import Searchfield from "../components/Searchfield"
import Topusername from "../components/Topusername"
import Dateinput from "../components/Dateinput"
import Button from '../components/Button'
import { useState } from "react"
import MonthlyReportCard from "../components/ReoprtCard"

import { UserContext } from "../context/UserContext";
import { useContext } from "react";


function Report() {

  const [startsearchdate,setStartsearchdate] = useState("")
  const [endsearchdate,setEndsearchdate] = useState("")

  const {user} = useContext(UserContext)

  const searchbydate = ()=>{


    console.log(startsearchdate)
    console.log(endsearchdate)

  }

  const dummyReports = [
    {
      id: "1",
      userId: "user-1",
      reportType: "MONTHLY",
      startDate: "01-Apr-2025",
      endDate: "30-Apr-2025",
      totalTransactions: 120,
      totalSent: 1500.00,
      totalReceived: 500.00,
      generatedAt: "30-Apr-2025"
    },
    {
      id: "2",
      userId: "user-2",
      reportType: "MONTHLY",
      startDate: "01-Mar-2025",
      endDate: "31-Mar-2025",
      totalTransactions: 85,
      totalSent: 2200.50,
      totalReceived: 700.25,
      generatedAt: "31-Mar-2025"
    },
    {
      id: "3",
      userId: "user-3",
      reportType: "MONTHLY",
      startDate: "01-Feb-2025",
      endDate: "28-Feb-2025",
      totalTransactions: 98,
      totalSent: 1800.75,
      totalReceived: 900.00,
      generatedAt: "28-Feb-2025"
    },  
    {
      id: "4",
      userId: "user-1",
      reportType: "MONTHLY",
      startDate: "01-Apr-2025",
      endDate: "30-Apr-2025",
      totalTransactions: 120,
      totalSent: 1500.00,
      totalReceived: 500.00,
      generatedAt: "30-Apr-2025"
    },
    {
      id: "5",
      userId: "user-2",
      reportType: "MONTHLY",
      startDate: "01-Mar-2025",
      endDate: "31-Mar-2025",
      totalTransactions: 85,
      totalSent: 2200.50,
      totalReceived: 700.25,
      generatedAt: "31-Mar-2025"
    },
    {
      id: "6",
      userId: "user-3",
      reportType: "MONTHLY",
      startDate: "01-Feb-2025",
      endDate: "28-Feb-2025",
      totalTransactions: 98,
      totalSent: 1800.75,
      totalReceived: 900.00,
      generatedAt: "28-Feb-2025"
    }
  ];
  




  return (
    <>
      <div className=" flex flex-col w-11/12 gap-8">

        <div className="grid grid-cols-6 gap-x-36">
          <div className="col-span-2 ">
            <Dateinput label={"Start Date"} value={startsearchdate} onChange={(e)=>setStartsearchdate(e.target.value)}/>
          </div>
          <div className="col-span-2 ">
            <Dateinput label={"End Date"} value={endsearchdate}  onChange={(e)=>setEndsearchdate(e.target.value)}/>
          </div>

          <div className="col-span-2 h-fit flex flex-col self-end  ">
            <Button onClick={searchbydate}  className=' text-[#F9F7FE]' color={"[#5E99CA]"}>
                Apply Filtration   
            </Button>
          </div>
        </div>



        <div className=" reportcards  grid grid-cols-6 gap-12">


          {dummyReports.map((report) => (
            <>
            <div className="col-span-2 ">
                <MonthlyReportCard
                  key={report.id}
                  reportType={report.reportType}
                  totalTransactions={report.totalTransactions}
                  totalSent={report.totalSent}
                  totalReceived={report.totalReceived}
                  startDate={report.startDate}
                  endDate={report.endDate}
                />
              </div>
            </>

            ))}
        </div>
      </div>




    </>
  )
}

export default Report
