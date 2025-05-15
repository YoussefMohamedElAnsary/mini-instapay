import { useState } from "react";
import Inputfield from "../components/Inputfield";
import PinInput from "../components/Pinnumber";
import Button from "../components/Button";
import doneimg from "../assets/9933421_4300520 1.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import TransactionServices from "../services/TransactionServices";
import authService from "../services/uthService";


function SendMoneyModal({ isOpen, step, setStep, closeModal }) {

  const [amount, setAmount] = useState("")
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState("")
  const [description, setDescription] = useState("")
  const [pinCode, setPinCode] = useState("");
  const [closeconfirm, setCloseconfirm] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [transactionId, setTransactionId] = useState(null)

  const { user, token, refreshUser } = useContext(UserContext);

  const cancelTransaction = async () => {
    if (transactionId) {
      try {
        await TransactionServices.cancelTransaction(transactionId, token);
        console.log("Transaction cancelled successfully");
      } catch (error) {
        console.error("Error cancelling transaction:", error);
      }
    }
  };

  const handleNext = async () => {

    if (step === 1) {

      if (amount === "" || receiverPhoneNumber === "") {
        setError("Please fill all the fields")
        return
      }

      if (amount < 0) {
        setError("Amount cannot be negative")
        return
      }

      if (receiverPhoneNumber.length !== 11) {
        setError("Phone number not valid")
        return
      }

      setLoading(true)
      
      try {

        const response = await TransactionServices.sendMoney(user.id, receiverPhoneNumber, amount, description ? description : "", token)

        if (response.status >= 200 && response.status < 300) {
          // Store the transaction ID for possible cancellation
          setTransactionId(response.data.id);
          setLoading(false)
          setStep(2);
          return
        }
        else {
          setError(response.data.message)
          setLoading(false)
          return
        }
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
        setLoading(false)
        return
      }

    }

    else if (step === 2) {
      if (pinCode.length !== 4) {
        setError("Pin code must be 4 digits")
        return
      }

      setLoading(true)
      
      try {
        const pinResponse = await authService.verifyPin(pinCode, token)

        if (pinResponse.status >= 200 && pinResponse.status < 300) {
          // PIN verification successful, now confirm the transaction
          try {
            const confirmResponse = await TransactionServices.confirmTransaction(transactionId, token);
            console.log("Transaction confirmed:", confirmResponse.data);
            
            if (confirmResponse.status >= 200 && confirmResponse.status < 300) {
              setLoading(false);
              setStep(3);
              await refreshUser(token);
              return;
            } else {
              setError(confirmResponse.data.message || "Failed to confirm transaction");
              setLoading(false);
              return;
            }
          } catch (confirmError) {
            console.error("Transaction confirmation error:", confirmError);
            setError(confirmError.response?.data?.message || "Failed to confirm transaction");
            setLoading(false);
            return;
          }
        }
        else {
          setError(pinResponse.data.message)
          setLoading(false)
          return
        }
      } catch (error) {
        setError(error.response?.data?.message || "PIN verification failed")
        setLoading(false)
        return
      }
    }
    else if (step === 3) {
      await refreshUser(token);
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

  const confirmClose = async () => {
    if (step === 2 && transactionId) {
      await cancelTransaction();
    }
    
    // Reset all states
    setAmount("");
    setReceiverPhoneNumber("");
    setDescription("");
    setPinCode("");
    setTransactionId(null);
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
      <div className="fixed inset-0 bg-black opacity-25 z-[1000]"></div>

      <div className="absolute top-36 flex  justify-center z-[1001] w-[60%]  h-fit p-6 m-auto rounded-xl shadow-2xl bg-white">

        <button onClick={handleCancel}  className= "cursor-pointer hover:bg-red-500 absolute text-4xl right-6 border-2 w-10 h-10 rounded-4xl flex items-center justify-center "> 
          <FontAwesomeIcon icon={faXmark} /> 
        </button>
        <div className=" w-10/12  ">
        
          {step===1 &&
            <div className="flex flex-col gap-4 items-center m-auto  ">              

              <h2 className=" text-[#99C445] font-bold text-3xl"> Transaction Data </h2>

              <Inputfield type={"number"} label={"Amount"} placeholder={"EG. 250"}  className="text-xl"  onChange={(e)=>setAmount(e.target.value)}/>

              <Inputfield type={"text"} label={"Phone Number"} placeholder={"01012345678"}  className="text-xl" onChange={(e)=> setReceiverPhoneNumber(e.target.value)}/>

              <Inputfield type={"text"} label={"Description "} placeholder={"Description (optional)"}  className="text-xl" onChange={(e)=> setDescription(e.target.value)}/>

              <Button  
              onClick={handleNext } 
              className=' mt-2 hover:bg-[#9ac445e9] text-white bg-primary' 
              >
                 {loading ? "loading..." : "Next"}  
              </Button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          }

          {step===2 &&
            <div className="flex flex-col gap-4 items-center m-auto  ">              

              <h2 className=" text-[#99C445] font-bold text-3xl">Please enter your PIN code </h2>
              
              <PinInput onChange={setPinCode} value={pinCode} maxLength={4} className='text-xl' />

              <Button  onClick={handleNext} className=' mt-2 hover:bg-[#9ac445e9] text-white bg-primary'  >
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
                className=' mt-2 hover:bg-[#9ac445e9] text-white bg-primary'>
                  Done 
              </Button>

            </div>
          }

        </div>


        {/* Confirmation Dialog */}
        
        {closeconfirm && (
          <>
            <div className="fixed inset-0 bg-black opacity-25 z-[1050]"></div>
            <div className="absolute m-auto content-center self-center inset-0 flex justify-center items-center z-[1051]">
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
