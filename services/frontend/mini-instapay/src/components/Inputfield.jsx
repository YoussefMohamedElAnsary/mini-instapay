
import React from 'react'

function Inputfield({ label , type, placeholder ,value , onChange ,className= '' }) {
  return (
    <>
        <div className={`flex flex-col gap-2 w-full text-sm  md:text-lg  lg:text-xl ${className}`}>
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full placeholder-gray-400 caret-gray-400 outline-none  px-4 py-2 rounded-xl border border-gray-400"
                value={value}
                onChange={onChange}
            />
        </div>

      
    </>
  )
}

export default Inputfield


