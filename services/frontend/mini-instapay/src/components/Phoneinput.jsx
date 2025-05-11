import React from 'react'



function Phoneinput( {type , label ,placeholder,  value ,className , onChange}) {
  return (
    <>

        <div className={`w-full flex flex-col gap-2  text-sm  md:text-lg  lg:text-xl   ${className}`}>
            <label className='font-semibold'> {label} </label>
            <div className='px-4 py-2 rounded-xl border-1 border-gray-400  w-full flex items-center justify-start gap-4' >
                <span className='text-gray-700'> +02 </span>
                <div className='h-5 w-0.5 bg-gray-400'></div>
                <input 
                    type={type} 
                    placeholder={placeholder} 
                    className="placeholder-gray-400  text-gray-700 caret-gray-400  outline-none flex-1"
                    value={value}
                    onChange={onChange}
                />                
            </div>
        </div>


    </>
  )
}

export default Phoneinput
