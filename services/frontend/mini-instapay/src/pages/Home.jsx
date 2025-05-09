
import Sidebar from "../components/Sidebar"
import Homebutton from "../components/homebutton";
import Recenttransactions from "../components/Recenttransactions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import SendMoneyModal from "./SendMoneyModal";
import { useState } from "react";
import Topusername from "../components/Topusername";
import { useNavigate } from "react-router-dom";
function Home() {

  const navigate = useNavigate();

    
    const [transactionData , settransactionData] = useState(
        [
            {
                id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
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
                id: "550e8400-e29b-41d4-a716-446655440000",
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
                id: "9c4e1e7a-7b28-4d5c-8a1f-6d2e8b9c0d3e",
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
                id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
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


    const [step , setStep] = useState(1)
    const [issendModalOpen , setissendModalOpen] = useState(false)


    const openSendMoneyModal = () => {
        console.log("send")
        setissendModalOpen(true);
        setStep(1); // Start from Step 1
    };


    const closeModal = () => {
    setissendModalOpen(false);
    console.log(step)

    };
 
 
 
    return (
    <>


            <div className=" relative overflow-y-auto  flex-1 flex flex-col gap-4 items-center p-5">

                <Topusername/>

                <div className="flex flex-col w-11/12  gap-8">

                    
                    <div className="balance flex flex-col items-center">
                        <span className="text-l font-medium text-[#8D8D8D]"> Total Balance (EGP) </span>
                        <span className="  text-2xl  lg:text-4xl font-bold text-[#0E0E0E]"> EGP5250.00 </span>
                    </div>


                    <div className="buttonsgroup grid grid-rows-2 grid-cols-2  gap-x-10 lg:gap-x-18  xl:gap-x-28  gap-y-5 ">
                        <Homebutton
                            onClick={openSendMoneyModal}
                            text={"send"}
                            icon={faUser}
                            color={"[#99C445]"}
                            textcolor={"black"}
                            />
                        <Homebutton
                            onClick={()=>navigate("/transactions")}
                            text={"Receive"}
                            icon={faUser}
                            color={"[#5E99CA]"}
                            textcolor={"black"}
                            />
                        <Homebutton
                            onClick={()=>navigate("/transactions")}
                            text={"Payments"}
                            icon={faUser}
                            color={"[#9BC3E3]"}
                            textcolor={"black"}                        
                            />
                        <Homebutton
                            onClick={()=>navigate("/report")}
                            text={"Reporting"}
                            icon={faUser}
                            color={"[#95AD67]"}
                            textcolor={"black"}                        
                            />
                    </div>


                    <div className="recenttransactionsec">
                        <Recenttransactions data={transactionData} displayLimit={4}/>
                    </div>
                </div>
                

                {issendModalOpen && (
                <SendMoneyModal 
                  isOpen={issendModalOpen} 
                  step={step}
                  setStep={setStep} 
                  closeModal={closeModal}
                />
                )}

            </div>


    </>
  )
}

export default Home
