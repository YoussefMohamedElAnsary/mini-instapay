import React from 'react'


function Button({ children, onClick , className = '' , type , color  }) {


  return (
    <>
        <button onClick={onClick}  className={`py-2 w-full h-full bg-${color}   text-sm   md:text-lg  lg:text-xl  rounded-xl transition cursor-pointer  ${className}`} type={type}>
        
            {children}
        
        </button>
    </>
  )
}

export default Button
