import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Topusername from "../components/Topusername"
import SettingstabSwitcher from "../components/SettingstabSwitcher"
import ProfileTab from "../components/ProfileTab"
import SecurityTab from "../components/SecurityTab"
import { useTheme } from "../context/ThemeContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    console.log(activeTab)
  }, [activeTab])

  return (
    <>
      <div className="flex-1 flex flex-col gap-12 items-center p-5"> 
        <div className="w-full flex justify-between items-center">
          <Topusername/>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <FontAwesomeIcon 
              icon={theme === 'light' ? faMoon : faSun} 
              className="text-xl text-primary-light dark:text-primary-dark"
            />
          </button>
        </div>

        <div className="rounded-2xl bg-card-light dark:bg-card-dark shadow-md w-11/12 flex flex-col p-4 pb-8 gap-4">
          <SettingstabSwitcher 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
          />
          <div className="bg-gray-200 dark:bg-gray-700 w-full h-0.5 mb-6"></div>

          {activeTab === "Profile" && <ProfileTab setActiveTab={setActiveTab} activeTab={activeTab} />}
          {activeTab === "Security" && <SecurityTab/>}
        </div>
      </div>
    </>
  )
}

export default Settings
