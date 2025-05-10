import Sidebar from './Sidebar';
import Topusername from "../components/Topusername";
import { Outlet } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { useContext } from "react";


function Layout() {
  
  const {user} = useContext(AuthContext)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
      <div className=" relative overflow-y-auto  flex-1 flex flex-col gap-4 items-center p-5">
        <Topusername username={ user.username }/>
        <Outlet />
        
        </div>
      </div>
    </div>
  );
}

export default Layout;