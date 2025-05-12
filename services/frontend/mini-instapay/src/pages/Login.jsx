import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Passwordinput from '../components/PasswordInput'
import Phoneinput from '../components/Phoneinput'
import { useState } from 'react'
import openeye from '..//assets/eye.png'
import closedeye from '..//assets/crossed-eye.png'
import Arrow from '../components/arrow'

import authService from '../services/uthService'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'


function Login() {


  const {login} = useContext(UserContext)
  const navigate = useNavigate()


  const [showpassword, setShowPassword] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)



  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('');

    if (!phoneNumber.trim()) {
      setError('Phone number is required');
      return;
    }
  
    if (!/^\d{11,11}$/.test(phoneNumber)) {
      setError('Please enter a valid phone number');
      return;
    }

    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    setLoading(true)


    try {
  
        const response = await authService.login(phoneNumber, password);
        console.log('Login response:', response);
        
        if (response && response.data) {
            setLoading(false);
            setError('');
            login(response.data)
            navigate('/');
        }
    } catch (error) {
        console.error('Login error:', error);
        
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('Login failed. Please try again.');
        }

        setLoading(false);
    }


  }


  return (
    <>

      <div className='Relative' >

        <Arrow label={"Have an account?"} onClick={()=>navigate('/register') } />
        <div className='min-h-screen  w-10/12  lg:w-1/2 m-auto  flex flex-col  justify-center gap-8'>

          <div className='flex flex-col items-center justify-center gap-3'>
            <h2 className='text-2xl  md:text-3xl  lg:text-5xl font-medium text-[#99C445]'> Login </h2>
            <p className=' text-l  md:text-xl  lg:text-2xl font-normal text-[#8D8D8D]'> Please enter your phone number </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='flex flex-col items-start  gap-9'>
              
              <Phoneinput
                type={"tel"}
                value={phoneNumber}
                label={"Phone Number"}
                placeholder={"01157788834"}
                onChange={(e)=> setPhoneNumber(e.target.value)}
              />

              <Passwordinput
                type={showpassword ? "text" : "password"}
                value={password}
                label={"password"}
                placeholder={"*******"}
                onChange={(e)=> setPassword(e.target.value)}
                src={showpassword ? openeye : closedeye}
                oneyeClick={() => setShowPassword(!showpassword)}
              />

              <Button type={'submit'} 
                className=' hover:bg-[#9ac445e9] text-[white] bg-primary' 
              >
                Login  

              </Button>

              <div className="self-center flex items-center justify-center mt-4 min-h-[24px]">
                {loading && (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-2 border-[#99C445] border-t-transparent"></div>
                )}
                {error && <p className='text-red-500 text-l font-normal self-center'> {error} </p>}                
              </div>


            </div>
          </form>


        </div>

      </div>
        
        

    </>
  )
}

export default Login
