import React from 'react'


function Button({ children, onClick , className = '' , type  }) {


  return (
    <>
        <button onClick={onClick}  className={`py-2 w-full h-full    text-sm   md:text-lg  lg:text-xl  rounded-xl transition cursor-pointer  ${className}`} type={type}>
        
            {children}
        
        </button>
    </>
  )
}

export default Button
