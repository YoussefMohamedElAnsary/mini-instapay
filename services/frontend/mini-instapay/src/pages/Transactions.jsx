import Sidebar from "../components/Sidebar"
import Topusername from "../components/Topusername"
import Searchfield from "../components/Searchfield"
import Recenttransactions from "../components/Recenttransactions"
import { useEffect, useState } from "react"

function Transactions() {

  const [transactionData , settransactionData] = useState(
    [
        {
            id: "6ba0b810-9dad-11d1-80b4-00c04fd430c8",
            senderUserId: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
            receiverUserId: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
            amount: 150.7500,
            type: "SENT",
            status: "COMPLETED",
            description: "Monthly rent payment",
            createdAt: "2023-11-01T08:00:00.000Z",
            updatedAt: "2023-11-01T08:00:00.000Z"
          },
          {
            id: "550e84m0-e29b-41d4-a716-446655440000",
            senderUserId: "550e8401-e29b-41d4-a716-446655440000",
            receiverUserId: "550e8402-e29b-41d4-a716-446655440000",
            amount: 89.9900,
            type: "COLLECTED",
            status: "COMPLETED",
            description: "Invoice #12345",
            createdAt: "2023-11-02T14:30:00.000Z",
            updatedAt: "2023-11-02T14:30:00.000Z"
          },
          {
            id: "1b9d6bvd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
            senderUserId: "1b9d6bce-bbfd-4b2d-9b5d-ab8dfbbd4bed",
            receiverUserId: "1b9d6bcf-bbfd-4b2d-9b5d-ab8dfbbd4bed",
            amount: 200.0000,
            type: "SENT",
            status: "FAILED",
            description: "Insufficient funds",
            createdAt: "2023-11-03T10:15:00.000Z",
            updatedAt: "2023-11-03T10:15:30.000Z"
          },
          {
            id: "9c4e1e7a-7b28-4d5c-pa1f-6d2e8b9c0d3e",
            senderUserId: "9c4e1e7b-7b28-4d5c-8a1f-6d2e8b9c0d3e",
            receiverUserId: "9c4e1e7c-7b28-4d5c-8a1f-6d2e8b9c0d3e",
            amount: 10000.0000,
            type: "SENT",
            status: "COMPLETED",
            description: "Business investment",
            createdAt: "2023-11-04T16:45:00.000Z",
            updatedAt: "2023-11-04T16:45:00.000Z"
          },
          {
            id: "f47ac10b-58cc-4372-a567-0e82b2c3d479",
            senderUserId: "f47ac10c-58cc-4372-a567-0e02b2c3d479",
            receiverUserId: "f47ac10d-58cc-4372-a567-0e02b2c3d479",
            amount: 5.9900,
            type: "COLLECTED",
            status: "COMPLETED",
            description: "Coffee shop payment",
            createdAt: "2023-11-05T09:00:00.000Z",
            updatedAt: "2023-11-05T09:00:00.000Z"
          }
          ,
          {
            id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
            senderUserId: "1b9d6bce-bbfd-4b2d-9b5d-ab8dfbbd4bed",
            receiverUserId: "1b9d6bcf-bbfd-4b2d-9b5d-ab8dfbbd4bed",
            amount: 200.0000,
            type: "SENT",
            status: "FAILED",
            description: "Insufficient funds",
            createdAt: "2023-11-03T10:15:00.000Z",
            updatedAt: "2023-11-03T10:15:30.000Z"
          },
          {
            id: "9c4e1e7a-wb28-4d5c-8a1f-6d2e8b9c0d3e",
            senderUserId: "9c4e1e7b-7b28-4d5c-8a1f-6d2e8b9c0d3e",
            receiverUserId: "9c4e1e7c-7b28-4d5c-8a1f-6d2e8b9c0d3e",
            amount: 10000.0000,
            type: "SENT",
            status: "COMPLETED",
            description: "Business investment",
            createdAt: "2023-11-04T16:45:00.000Z",
            updatedAt: "2023-11-04T16:45:00.000Z"
          },
          {
            id: "f47ac10b-58cc-4372-a567-0e02w2c3d479",
            senderUserId: "f47ac10c-58cc-4372-a567-0e02b2c3d479",
            receiverUserId: "f47ac10d-58cc-4372-a567-0e02b2c3d479",
            amount: 5.9900,
            type: "COLLECTED",
            status: "COMPLETED",
            description: "Coffee shop payment",
            createdAt: "2023-11-05T09:00:00.000Z",
            updatedAt: "2023-11-05T09:00:00.000Z"
          }
    ]
)




const [searchvalue , setSearchvalue] = useState("")

const [filteredTransactions, setFilteredTransactions] = useState(transactionData)

useEffect(() => {

  console.log(searchvalue)
  if (searchvalue.trim() === "") {
    setFilteredTransactions(transactionData); // Show all if input is empty
  } else {
    const filtered = transactionData.filter((transaction) => {
      const search = searchvalue.toLowerCase();
      return (
        transaction.description.toLowerCase().includes(search) ||
        transaction.status.toLowerCase().includes(search) ||
        transaction.type.toLowerCase().includes(search)
      );
    });
    setFilteredTransactions(filtered);
  }
}, [searchvalue, transactionData]);





  return (
    <>
      


        <div className=" overflow-y-auto flex-1 flex flex-col gap-8 items-center p-5"> 

            <Topusername/>

            <div className=" flex flex-col w-11/12  gap-8">


            {/* fe moshkla fe loggic el search zabatha matnsash */}

            <Searchfield  
              value={searchvalue}
              onChange={(e) => setSearchvalue(e.target.value)}
              placeholder={"Search by name, status, or type"}
            />

            <Recenttransactions data={filteredTransactions}/>


            </div>


        </div>


    </>
  )
}

export default Transactions
