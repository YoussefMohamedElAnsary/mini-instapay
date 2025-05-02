import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Passwordinput from './PasswordInput';
import openeye from '..//assets/eye.png'
import closedeye from '..//assets/crossed-eye.png'
import { useState } from 'react';


function SecurityTab() {

    const [showpassword, setShowPassword] = useState(false)
  
  return (
    <>

<div class="  grid grid-cols-5 gap-6">
      <div class="col-span-5 xl:col-span-1 flex items-center justify-center ">
        <FontAwesomeIcon icon={showpassword? faLockOpen :faLock }  className='text-8xl ' />
      </div>
      
      <div class=" col-span-5 xl:col-span-4 ">

      <Passwordinput
        type={showpassword ? "text" : "password"}
        value={"password123"}
        label={"password"}
        placeholder={"*******"}
        src={showpassword ? openeye : closedeye}
        oneyeClick={() => setShowPassword(!showpassword)}
        readonly
      />
      </div>
    </div>
      
    </>
  )
}

export default SecurityTab
