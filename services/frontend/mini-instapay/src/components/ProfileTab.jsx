import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Passwordinput from '../components/PasswordInput'
import Phoneinput from '../components/Phoneinput'
import Inputfield from '../components/Inputfield'

import { UserContext } from '../context/UserContext';
import { useContext } from 'react';


function ProfileTab({ setActiveTab}) {

  const {user} = useContext(UserContext)




  return (
    <>
    <div class="  grid grid-cols-5 gap-6">
      <div class="col-span-5 xl:col-span-1 flex items-center justify-center ">
        <FontAwesomeIcon icon={faUser}  className='text-8xl ' />
      </div>
      
      <div class="col-span-5 xl:col-span-2  flex flex-col gap-6">

        <Inputfield
          label={"Your Name"}
          type={"text"}
          value={user.username}
          readOnly
          className=''
        />

        <Phoneinput
          type={"tel"}
          value={user.phoneNumber}
          label={"Phone Number"}
          placeholder={"01549384592"}
        />

        <Inputfield
          label={"Card Number"}
          type={"text"}
          value={user.cardNumber}
          readOnly
        />


      </div>
      
      <div class=" col-span-5 xl:col-span-2 ">

        <Passwordinput
            viewpass={true}
            type={"password"}
            value={"password"}
            label={"password"}
            readOnly
            openSecurity={()=>setActiveTab("Security")} 

          />
      </div>
    </div>
      
    </>
  )
}

export default ProfileTab

