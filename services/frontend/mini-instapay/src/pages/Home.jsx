import Sidebar from "../components/Sidebar"
import Homebutton from "../components/homebutton";
import Recenttransactions from "../components/Recenttransactions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import SendMoneyModal from "./SendMoneyModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from '../context/UserContext';
import { useContext } from "react";
import { useEffect } from "react";
import { TransactionContext } from '../context/TransactionContext';


function Home() {


    const [step , setStep] = useState(1)
    const [issendModalOpen , setissendModalOpen] = useState(false)
    

    const {user} = useContext(UserContext)
    const {transactions} = useContext(TransactionContext)

    const navigate = useNavigate();
  
    useEffect(()=>{
      console.log( "user data",  user)
    },[user])
  





    const openSendMoneyModal = () => {
        console.log("send")
        setissendModalOpen(true);
        setStep(1); // Start from Step 1
    };


    const closeModal = () => {
    setissendModalOpen(false);
    console.log(step)

    };
 

    if (!user) return <div>Loading...</div>; 
 
    return (
    <>

      <div className="flex flex-col w-11/12 gap-8 relative z-0">
          
          <div className="balance flex flex-col items-center">
              <span className="text-l font-medium text-[#8D8D8D]"> Total Balance (EGP) </span>
              <span className="text-2xl lg:text-4xl font-bold text-[#0E0E0E]"> EGP {user.balance} </span>
          </div>


          <div className="buttonsgroup grid grid-rows-2 grid-cols-2 gap-x-10 lg:gap-x-18 xl:gap-x-28 gap-y-5">
              <Homebutton
                  onClick={openSendMoneyModal}
                  text={"send"}
                  icon={faUser}
                  className={"bg-primary text-black"}
                  />
              <Homebutton
                  onClick={()=>navigate("/transactions")}
                  text={"Receive"}
                  icon={faUser}
                  className={"bg-secondary text-black"}
                  />
              <Homebutton
                  onClick={()=>navigate("/transactions")}
                  text={"Payments"}
                  icon={faUser}
                  className={"bg-blue-100 text-black"}
                  />
              <Homebutton
                  onClick={()=>navigate("/report")}
                  text={"Reporting"}
                  icon={faUser}
                  className={"bg-darkgreen text-black"}
                  />
          </div>


          <div className="recenttransactionsec">
              <Recenttransactions data={transactions} displayLimit={4}/>
          </div>
      </div>
      
      {/* Render modal directly in portal root, outside the main content hierarchy */}
      {issendModalOpen && (
        <SendMoneyModal 
          isOpen={issendModalOpen} 
          step={step}
          setStep={setStep} 
          closeModal={closeModal}
        />
      )}

    </>
  )
}

export default Home
