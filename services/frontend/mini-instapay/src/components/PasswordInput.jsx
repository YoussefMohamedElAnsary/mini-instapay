import React from 'react'

function Passwordinput({type , value,label, placeholder , onChange , oneyeClick , src ,className= '' , viewpass, openSecurity}) {
  
  
  return (
    
    <>
      <div className={`w-full flex flex-col gap-2  text-sm   md:text-lg  lg:text-xl  ${className}`}>
    
        <div className='w-full flex justify-between items-center'>
        <label className='font-semibold'> {label} </label>    
        { viewpass && <button onClick={openSecurity} className='text-xs md:text-sm  underline cursor-pointer text-gray-500'>Show Password</button>}
        </div>
        <div className='px-4 py-2 rounded-xl border-1 border-gray-400 w-full flex items-center'>
          <input 
            type={type} 
            placeholder={placeholder} 
            className="placeholder-gray-400  text-gray-700 caret-gray-400  outline-none flex-1"
            value={value}
            onChange={onChange}
          />                
          {src && 
            <img 
            onClick={oneyeClick}
            src={src}
            alt="Show password"
            className='w-5  cursor-pointer' 
          />
          }
          
          
        </div>
      </div>



    </>
  )
}

export default Passwordinput
