import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';


function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;