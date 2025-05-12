import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import welcomeimg from '../assets/18352169_5989811 1.png'
import './welcome.css'

function Welcome() {

    const navigate = useNavigate()

  return (
    <>

        <div className=' w-3xl min-h-screen m-auto  flex flex-col items-center justify-center  gap-8 '> 

            <h2 className='text-5xl font-bold text-[#99C445] '> Flow Pay </h2> 

            <img src={welcomeimg} alt='welcome' className='w-64' />

            <p className='font-medium'> Welcome. Let's start by creating your account or sign in if you already have one </p>

             <div className=' w-full flex gap-5'>
                <Button onClick={()=> navigate("/register")} className='welcomebtn text-white bg-l ' color={"[#99C445]"} textsize={"l"}  > Sign Up </Button>
                <Button onClick={() => navigate("/login")} className='welcomebtn text-secondary bg-blue-50'color={"[#D9E1FF]"} textsize={"l"} >Login</Button>

             </div>

        </div>

        

    </>
  )
}

export default Welcome
