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

function Signup() {


    const [showpassword, setShowPassword] = useState(false)
  
    const navigate = useNavigate()
  
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
  
    const [pinValue, setPinValue] = useState('');
    const [fullname, setfullname] = useState('');


    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');
    
      if (!phoneNumber.trim()) {
        setError('Phone number is required');
        return;
      }
    
      if (!/^\d{11}$/.test(phoneNumber)) {
        setError('Please enter a valid phone number');
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
    
      if (password !== confirmpassword) {
        setError('Passwords do not match');
        return;
      }
    
      if (pinValue.length < 4) {
        setError('PIN is required');
        return;
      }
    
      setLoading(true);
    
      setTimeout(() => {
        console.log(fullname, phoneNumber, password, confirmpassword, pinValue);
        setLoading(false);
        setfullname('');
        setPassword('');
        setPhoneNumber('');
        setconfirmpassword('');
        setPinValue('');
        navigate('/login')
      }, 1000);


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
              label={"Enter your full name"}
              placeholder={"EG. Ahmed Ali Osama Fawzi"}
              type={"text"}
              value={fullname}
              onChange={(e)=>{setfullname(e.target.value)}}
            />

              <Phoneinput
                type={"tel"}
                value={phoneNumber}
                label={"Phone Number"}
                placeholder={"01549384592"}
                onChange={(e)=> setPhoneNumber(e.target.value)}
              />

              <Passwordinput
                type={showpassword ? "text" : "password"}
                value={password}
                label={"password"}
                placeholder={".........."}
                onChange={(e)=> setPassword(e.target.value)}
                src={showpassword ? openeye : closedeye}
                oneyeClick={() => setShowPassword(!showpassword)}
              />

              <Passwordinput
                type={showpassword ? "text" : "password"}
                value={confirmpassword}
                label={"Confirm Password"}
                placeholder={".........."}
                onChange={(e)=> setconfirmpassword(e.target.value)}
                src={showpassword ? openeye : closedeye}
                oneyeClick={() => setShowPassword(!showpassword)}
              />


              <PinInput 
                value={pinValue} 
                onChange={setPinValue} 
                label={"your PIN code"}
                maxLength={4} 
              />

              <Button type={'submit'} className='hover:bg-[#9ac445e9]' color={"[#99C445]"} textsize={"l"} textcolor={"white"}   > Sign Up  </Button>

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
