import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

function Topusername( {username} ) {
  const navigate = useNavigate()
  return (
    
    <div className="  self-end flex gap-2 items-center  text-sm   md:text-xl font-bold">
        <span>Mohamed Ahmed</span>
        <FontAwesomeIcon icon={faUser} onClick={()=> navigate("/settings")} />
    </div>
  )
}

export default Topusername


