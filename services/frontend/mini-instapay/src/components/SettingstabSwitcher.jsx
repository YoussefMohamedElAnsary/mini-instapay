import React from 'react'

function SettingstabSwitcher( {activeTab , setActiveTab} ) {
  return (
    <>
        <ul className="flex gap-18 text-sm   md:text-lg  lg:text-xl ">
            <li 
              onClick={()=>setActiveTab("Profile")} 
              className={ ` ${activeTab ==='Profile' ? ' bg-[#99C445]' : ''} px-5 py-1 rounded-2xl  cursor-pointer  `} 
            >
              Profile
            </li>
            <li 
              onClick={()=> setActiveTab("Security")} 
              className={ ` ${activeTab ==='Security' ? '  bg-[#99C445]' : ''} px-5 p-1 rounded-2xl cursor-pointer`}
            >
              Security
            </li>
        </ul>  
    </>
  )
}

export default SettingstabSwitcher
