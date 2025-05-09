
import { useState } from "react";
import Inputfield from "../components/Inputfield";
import PinInput from "../components/Pinnumber";
import Button from "../components/Button";
import doneimg from "../assets/9933421_4300520 1.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function SendMoneyModal({ isOpen, step , setStep , closeModal }) {

  const [amount , setAmount] = useState("")
  const [cardnumber , setCardNumber] = useState("")
  const [comment , setComment] = useState("")
  const [pinCode, setPinCode] = useState("");
  const [closeconfirm , setCloseconfirm] = useState(false)



  const handleNext =()=>{

    if (step === 1) {

      setStep(2);
      console.log(amount)
      console.log(cardnumber)
      console.log(comment)

    
    } else if (step === 2) {
      setStep(3);
      console.log(pinCode)
    
    } else if (step === 3) {
      closeModal();
    }

  }

  const handleCancel = () => {
    if (step !== 3) {
      setCloseconfirm(true);
    } else {
      closeModal();
    }
  };

  const confirmClose = () => {
    setAmount("");
    setCardNumber("");
    setComment("");
    setPinCode("");
    setStep(1);   
    closeModal();
    setCloseconfirm(false);

  };

  const cancelClose = () => {
    setCloseconfirm(false);
  };






if (!isOpen) return null;

  return (
    <>

      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-25 z-40"></div>


      <div className="absolute top-36 flex  justify-center z-50 w-[60%]  h-fit p-6 m-auto rounded-xl shadow-2xl bg-white">

        <button onClick={handleCancel}  className= "cursor-pointer hover:bg-red-500 absolute text-4xl right-6 border-2 w-10 h-10 rounded-4xl flex items-center justify-center "> 
          <FontAwesomeIcon icon={faXmark} /> 
        </button>
        <div className=" w-10/12  ">
        
          {step===1 &&
            <div className="flex flex-col gap-4 items-center m-auto  ">              

              <h2 className=" text-[#99C445] font-bold text-3xl"> Transaction Data </h2>

              <Inputfield type={"number"} label={"Amount"} placeholder={"EG. 250"}  className="text-xl"  onChange={(e)=>setAmount(e.target.value)}/>

              <Inputfield type={"text"} label={"Card Number"} placeholder={"547965472589314"}  className="text-xl" onChange={(e)=> setCardNumber(e.target.value)}/>

              <Inputfield type={"text"} label={"Comment "} placeholder={"Comment (optional)"}  className="text-xl" onChange={(e)=> setComment(e.target.value)}/>

              <Button  
              onClick={handleNext } 
              className=' mt-2 hover:bg-[#9ac445e9]' 
              color={"[#99C445]"} 
              textsize={"l"} 
              textcolor={"white"}
              >

                 Next  
              </Button>
            </div>
          }

          {step===2 &&
            <div className="flex flex-col gap-4 items-center m-auto  ">              

              <h2 className=" text-[#99C445] font-bold text-3xl">Please enter your PIN code </h2>
              
              <PinInput onChange={setPinCode} value={pinCode} maxLength={4} className='text-xl' />

              <Button  onClick={handleNext} className=' mt-2 hover:bg-[#9ac445e9]' color={"[#99C445]"} textsize={"l"} textcolor={"white"}>
                Confirm Process  
              </Button>
            </div>
          }

          {step===3 &&
            <div className="flex flex-col gap-4 items-center m-auto  ">              

              <h2 className=" text-[#99C445] font-bold text-3xl"> You have successfully sent {amount}..EGP </h2>

              <img className="w-1/2" src={doneimg} alt="done"/>

              <Button  
                onClick={handleNext}
                className=' mt-2 hover:bg-[#9ac445e9]' 
                color={"[#99C445]"} 
                textsize={"l"} 
                textcolor={"white"}>
                  
                  Done 
              </Button>

            </div>
          }

        </div>


        {/* Confirmation Dialog */}
        
        {closeconfirm && (

          <>
            <div className="fixed inset-0 bg-black opacity-25 z-40"></div>
            <div className="absolute  m-auto content-center self-center inset-0 flex justify-center items-center z-50">
              <div className="relative p-6 rounded-xl shadow-2xl bg-white">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Cancellation</h2>
                <p className="text-gray-600 mb-6">Are you sure you want to cancel this transaction? All entered data will be lost.</p>
                
                <div className="flex justify-end gap-4">
                  <button
                    onClick={cancelClose}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    No, Continue
                  </button>
                  <button
                    onClick={confirmClose}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </div>
          </>

        )}



      </div>




      
    </>
  )
}

export default SendMoneyModal
