import React from 'react'

function Dateinput({value , label , onChange}) {
  return (
    <>
     <div className="flex flex-col gap-1  text-[#4782B3]  text-sm   md:text-lg  lg:text-xl">
        <label className="text-black"> {label }</label>
        <div className="   bg-[#D2E4FF] py-2 px-4  rounded-xl">
            <input type="date" className="w-full outline-none" value={value} onChange={onChange}/>
        </div>
    </div>
      
    </>
  )
}

export default Dateinput
