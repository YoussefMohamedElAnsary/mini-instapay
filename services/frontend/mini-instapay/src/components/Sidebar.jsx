import { useState } from 'react';
import transactionsicon from "../assets/Group 38.png";
import Reportsicon from "../assets/Group 42.png";
import settingicon from "../assets/Group 39.png";
import homeicon from "../assets/5973800.png"
import Button from "./Button";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import { useContext } from 'react';



function Sidebar() {

  const {logout} = useContext(UserContext)

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handlelogout = () => {
    logout()
    navigate('/welcome')
  }


  return (
    <>
    
      {/* toggle button: visible below lg */}
      <div className="lg:hidden fixed top-4  left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#5E99CA] text-3xl "
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* hidden by default on smaller than lg */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-3/4 sm:w-2/4 md:w-1/3  bg-white z-40 px-4 py-12 xl:px-8 gap-8 flex flex-col
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:flex lg:w-1/5
        `}
      >
        <div className="flex flex-col gap-2">
          <h2 onClick={()=>navigate("/home")} className="text-3xl xl:text-5xl font-bold text-[#99C445]">FlowPay</h2>
          <span className="text-2xl xl:text-4xl text-[#5E99CA]">Menu</span>
        </div>

        <ul className="flex flex-col gap-3 text-lg xl:text-2xl font-medium">

            <Link to="/home">
                <li className={`rounded-2xl p-2 flex items-center gap-2 cursor-pointer hover:bg-[#9BC3E3]
                        ${location.pathname === '/home' ? 'bg-[#9BC3E3] font-bold ' : ''}
                    `}>
                    <img className="w-6 xl:w-10" src={homeicon} alt="transaction" />
                    Home
                </li>
            </Link>
            <Link to="/transactions">
                <li className={`rounded-2xl p-2 flex items-center gap-2 cursor-pointer hover:bg-[#9BC3E3]
                        ${location.pathname === '/transactions' ? 'bg-[#9BC3E3] font-bold ' : ''}
                    `}>
                    <img className="w-6 xl:w-fit" src={transactionsicon} alt="transaction" />
                    
                    Transactions
                </li>
            </Link>
            <Link to="/settings">
                <li className={`rounded-2xl p-2 flex items-center gap-2 cursor-pointer hover:bg-[#9BC3E3]
                        ${location.pathname === '/settings' ? 'bg-[#9BC3E3] font-bold ' : ''}
                    `}>
                    <img className="w-6 xl:w-fit" src={settingicon} alt="settings" />
                    
                    Profile
                </li>
            </Link>
            <Link to="/report">
                <li className={`rounded-2xl p-2 flex items-center gap-2 cursor-pointer hover:bg-[#9BC3E3]
                        ${location.pathname === '/report' ? 'bg-[#9BC3E3] font-bold ' : ''}
                    `}>
                    <img className="w-6 xl:w-fit" src={Reportsicon} alt="report" />
                    
                    Quick Report
                </li>
            </Link>

        </ul>

        <div className="mt-auto">
          <Button
            onClick={handlelogout}
            className="flex gap-2 justify-center items-center  text-white"
            type={"logout"}
            color={"[#5E99CA]"}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
              Log Out
          </Button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
