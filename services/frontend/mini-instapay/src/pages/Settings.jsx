import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Topusername from "../components/Topusername"
import SettingstabSwitcher from "../components/SettingstabSwitcher"
import ProfileTab from "../components/ProfileTab"
import SecurityTab from "../components/SecurityTab"

function Settings() {

  const [activeTab, setActiveTab] = useState("Profile");

  useEffect( ()=>{
    console.log(activeTab)
  } ,[activeTab])


  return (
    <>

      <div className="  flex  ">
              
        <Sidebar/>  

        <div className=" flex-1 flex flex-col gap-12 items-center p-5"> 

            <Topusername/>

            <div className=" rounded-2xl bg-white shadow-md   w-11/12  flex flex-col p-4 pb-8 gap-4">
              
              <SettingstabSwitcher 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
              />
              <div className="bg-gray-200 w-full h-0.5 mb-6"></div>

              {activeTab=== "Profile" && <ProfileTab setActiveTab={setActiveTab} activeTab={activeTab} />}
              {activeTab=== "Security" && <SecurityTab/>}

            </div>

         </div>
      </div>

    </>
  )
}

export default Settings
