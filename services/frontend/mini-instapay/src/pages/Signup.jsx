import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Passwordinput from '../components/PasswordInput'
import Phoneinput from '../components/Phoneinput'
import Inputfield from '../components/Inputfield'
import PinInput from '../components/Pinnumber'
import openeye from '..//assets/eye.png'
import closedeye from '..//assets/crossed-eye.png'
import Arrow from '../components/arrow'
import { useState } from 'react'

import authService from '../services/AuthService'



function Signup() {


  const navigate = useNavigate()

    const [showpassword, setShowPassword] = useState(false)  
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    // const [confirmpassword, setconfirmpassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
  
    const [pin, setPin] = useState('');
    const [username, setUsername] = useState('');
    const [cardNumber, setCardNumber] = useState('');


    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
    
      if (!phoneNumber.trim()) {
        setError('Phone number is required');
        return;
      }
    
      if (!/^\d{10}$/.test(phoneNumber)) {
        setError('Please enter a valid phone number');
        return;
      }

      if (phoneNumber.startsWith('0')) {
        setError('Phone number should not start with 0');
        return;
      }
      
    
      if (!password.trim()) {
        setError('Password is required');
        return;
      }
    
      if (password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }
    
      if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
        setError('Password must contain at least one letter and one number');
        return;
      }
    
      // if (password !== confirmpassword) {
      //   setError('Passwords do not match');
      //   return;
      // }
    
      if (pin.length < 4) {
        setError('PIN is required');
        return;
      }

      if (!cardNumber.trim()) {
        setError('Card number is required');
        return;
      }
    
      setLoading(true);

      try {
    
        const response = await authService.register(username, '0' + phoneNumber, password, pin, cardNumber);
      
        if(response){
          setLoading(false);
          setError('');
          navigate('/login');
        }
        else{
          setError('Something went wrong');
          setLoading(false);
        }
        
      } catch (error) {
        console.error('Registration error:', error);
        
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('Registration failed. Please try again.');
        }

        setLoading(false);
      }

     


    };

    


  
  return (
    <>

      <div className='Relative'>
      <Arrow  label={"Have an account?"} onClick={()=>navigate('/login') } />
      
      <div className='min-h-screen w-10/12  md:w-1/2 m-auto  flex flex-col  justify-center gap-5'>

          <div className='flex flex-col items-center justify-center gap-3'>
            <h2 className=' text-2xl  md:text-3xl  lg:text-5xl  font-medium text-[#99C445]'> Signup </h2>
            <p className=' text-l  md:text-xl  lg:text-2xl font-normal text-[#8D8D8D]'> Please fill the fields </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='flex flex-col items-start  gap-5'>

            <Inputfield
              label={"Enter your username"}
              placeholder={"EG. AhmedAli"}
              type={"text"}
              value={username}
              onChange={(e)=>{setUsername(e.target.value)}}
            />

              <Phoneinput
                type={"tel"}
                value={phoneNumber}
                label={"Phone Number"}
                placeholder={"1151155566"}
                onChange={(e)=> setPhoneNumber(e.target.value)}
              />

              <Inputfield
                label={"Card Number"}
                placeholder={"Enter your card number"}
                type={"text"}
                value={cardNumber}
                onChange={(e)=>{setCardNumber(e.target.value)}}
              />

              <Passwordinput
                type={showpassword ? "text" : "password"}
                value={password}
                label={"password"}
                placeholder={"**********"}
                onChange={(e)=> setPassword(e.target.value)}
                src={showpassword ? openeye : closedeye}
                oneyeClick={() => setShowPassword(!showpassword)}
              />

              {/* <Passwordinput
                type={showpassword ? "text" : "password"}
                value={confirmpassword}
                label={"Confirm Password"}
                placeholder={".........."}
                onChange={(e)=> setconfirmpassword(e.target.value)}
                src={showpassword ? openeye : closedeye}
                oneyeClick={() => setShowPassword(!showpassword)}
              /> */}


              <PinInput 
                value={pin} 
                onChange={setPin} 
                label={"your PIN code"}
                maxLength={4} 
              />

              
              <Button type={'submit'}  className=' hover:bg-[#9ac445e9] text-[white] bg-primary'  > Sign Up  </Button>

              <div className="self-center flex items-center justify-center mt-2 min-h-[24px]">
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-2 border-[#99C445] border-t-transparent"></div>
                ) : error && (
                  <p className="text-red-500 text-l font-normal self-center"> {error} </p>
                )}
              </div>  


            </div>
          </form>


        </div>

      </div>
        
        

       
    </>
  )
}

export default Signup
