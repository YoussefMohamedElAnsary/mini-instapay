import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Passwordinput from '../components/PasswordInput'
import Phoneinput from '../components/Phoneinput'
import Inputfield from '../components/Inputfield'

function ProfileTab({ setActiveTab}) {




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
          value={"Mohamed ahmed fathy"}
          readOnly
          className=''
        />

        <Phoneinput
          type={"tel"}
          value={"01151155566"}
          label={"Phone Number"}
          placeholder={"01549384592"}
        />

        <Inputfield
          label={"Card Number"}
          type={"text"}
          value={"845672115792486"}
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

