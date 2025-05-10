import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Topusername from "../components/Topusername"
import SettingstabSwitcher from "../components/SettingstabSwitcher"
import ProfileTab from "../components/ProfileTab"
import SecurityTab from "../components/SecurityTab"

import { AuthContext } from '../context/AuthContext';
import { useContext } from "react"

function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");

  const {user} = useContext(AuthContext)

  useEffect(() => {
    console.log(activeTab)
  }, [activeTab])

  return (
    <>
      <div className="rounded-2xl bg-white shadow-md w-11/12 flex flex-col p-4 pb-8 gap-4">
        <SettingstabSwitcher 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
        />
        <div className="bg-gray-200 w-full h-0.5 mb-6"></div>

        {activeTab === "Profile" && <ProfileTab setActiveTab={setActiveTab} activeTab={activeTab} />}
        {activeTab === "Security" && <SecurityTab/>}
      </div>
    </>
  )
}

export default Settings
